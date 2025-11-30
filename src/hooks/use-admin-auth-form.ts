
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useToast } from '@/hooks/use-toast';

export function useAdminAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isLoadingMagicLink, setIsLoadingMagicLink] = useState(false);
  
  const { handleLogin } = useAdminAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const storedLockout = localStorage.getItem('adminLockout');
    if (storedLockout) {
      const lockoutData = JSON.parse(storedLockout);
      const currentTime = new Date().getTime();
      const expiryTime = lockoutData.expiry;
      
      if (currentTime < expiryTime) {
        setIsLocked(true);
        setLockoutTime(expiryTime);
        setTimeRemaining(Math.ceil((expiryTime - currentTime) / 1000));
      } else {
        localStorage.removeItem('adminLockout');
      }
    }
    
    const storedAttempts = localStorage.getItem('adminFailedAttempts');
    if (storedAttempts) {
      setFailedAttempts(parseInt(storedAttempts));
    }
  }, []);
  
  useEffect(() => {
    if (isLocked && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsLocked(false);
            localStorage.removeItem('adminLockout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isLocked, timeRemaining]);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        localStorage.setItem('adminFailedAttempts', newFailedAttempts.toString());
        
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        
        if (newFailedAttempts >= 3) {
          const lockoutDuration = 5 * 60 * 1000;
          const expiryTime = new Date().getTime() + lockoutDuration;
          
          setIsLocked(true);
          setLockoutTime(expiryTime);
          setTimeRemaining(Math.ceil(lockoutDuration / 1000));
          
          localStorage.setItem('adminLockout', JSON.stringify({
            expiry: expiryTime
          }));
        }
        
        setPassword('');
        return;
      }

      if (data.user) {
        // Reset failed attempts
        setFailedAttempts(0);
        localStorage.setItem('adminFailedAttempts', '0');
        
        // Auth context will handle the rest via onAuthStateChange
        handleLogin({ 
          email: data.user.email || '',
          role: 'admin',
          name: data.user.user_metadata?.name,
          avatarUrl: data.user.user_metadata?.avatar_url
        });
      }
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setPassword('');
  };

  const handleMagicLinkLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (isLocked || !email) return;
    
    setIsLoadingMagicLink(true);
    
    try {
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: "Magic Link Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Magic Link Sent!",
        description: "Check your email for a login link. It may take a few minutes to arrive.",
      });
      
      setEmail('');
    } catch (err: any) {
      toast({
        title: "Magic Link Failed",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoadingMagicLink(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return {
    email,
    setEmail,
    password, 
    setPassword,
    failedAttempts,
    isLocked,
    timeRemaining,
    isLoadingMagicLink,
    handlePasswordLogin,
    handleMagicLinkLogin,
    formatTime
  };
}
