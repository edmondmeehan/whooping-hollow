
import { useState, useEffect } from 'react';
import { authenticateAdmin } from '@/services/admin-users-storage';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export function useAdminAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  
  const { handleLogin } = useAdminAuth();
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;
    
    const adminUser = authenticateAdmin(email, password);
    
    if (adminUser) {
      setFailedAttempts(0);
      localStorage.setItem('adminFailedAttempts', '0');
      
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 30);
      
      localStorage.setItem('adminSession', JSON.stringify({
        email: adminUser.email,
        role: adminUser.role,
        expiry: expiry.toISOString()
      }));
      
      handleLogin({ 
        email: adminUser.email,
        role: adminUser.role,
        name: adminUser.name,
        avatarUrl: adminUser.avatarUrl
      });
    } else {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      localStorage.setItem('adminFailedAttempts', newFailedAttempts.toString());
      
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
    }
    
    setPassword('');
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
    handleSubmit,
    formatTime
  };
}
