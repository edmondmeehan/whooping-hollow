
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LockIcon, ShieldCheck, UserIcon, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authenticateAdmin } from '@/services/admin-users-storage';

interface AdminLoginProps {
  onLogin: (adminData: { email: string; role: string }) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  
  // Check for existing lockout
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
        // Clear expired lockout
        localStorage.removeItem('adminLockout');
      }
    }
    
    // Load failed attempts
    const storedAttempts = localStorage.getItem('adminFailedAttempts');
    if (storedAttempts) {
      setFailedAttempts(parseInt(storedAttempts));
    }
  }, []);
  
  // Update countdown timer
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
  
  // Check for existing admin session
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const sessionData = JSON.parse(adminSession);
      const expiryTime = new Date(sessionData.expiry);
      
      // If session hasn't expired, login automatically
      if (expiryTime > new Date()) {
        onLogin({ 
          email: sessionData.email,
          role: sessionData.role
        });
      } else {
        // Clear expired session
        localStorage.removeItem('adminSession');
      }
    }
  }, [onLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) return;
    
    // Authenticate user with email/password
    const adminUser = authenticateAdmin(email, password);
    
    if (adminUser) {
      // Reset failed attempts on successful login
      setFailedAttempts(0);
      localStorage.setItem('adminFailedAttempts', '0');
      
      // Set admin session with 30 minute expiry
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 30);
      
      localStorage.setItem('adminSession', JSON.stringify({
        email: adminUser.email,
        role: adminUser.role,
        expiry: expiry.toISOString()
      }));
      
      onLogin({ 
        email: adminUser.email,
        role: adminUser.role
      });
    } else {
      // Increment failed attempts
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      localStorage.setItem('adminFailedAttempts', newFailedAttempts.toString());
      
      // Lock account after 3 failed attempts
      if (newFailedAttempts >= 3) {
        const lockoutDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
        const expiryTime = new Date().getTime() + lockoutDuration;
        
        setIsLocked(true);
        setLockoutTime(expiryTime);
        setTimeRemaining(Math.ceil(lockoutDuration / 1000));
        
        localStorage.setItem('adminLockout', JSON.stringify({
          expiry: expiryTime
        }));
      }
    }
    
    // Clear password input
    setPassword('');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-hamptons-accent/10 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-hamptons-accent" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access the admin area
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              {isLocked && (
                <Alert variant="destructive" className="mb-4">
                  <LockIcon className="h-4 w-4" />
                  <AlertDescription>
                    Too many failed attempts. Please try again in {formatTime(timeRemaining)}.
                  </AlertDescription>
                </Alert>
              )}
              
              {!isLocked && failedAttempts > 0 && (
                <Alert variant="warning" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Invalid credentials. Attempts remaining: {3 - failedAttempts}.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLocked}
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LockIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLocked}
                  required
                />
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                For demo purposes, use: eddie@please.co / brickhouse5150
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90"
              disabled={isLocked || !email || !password}
            >
              {isLocked ? `Locked (${formatTime(timeRemaining)})` : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
