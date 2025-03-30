
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LockIcon } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    // Check for existing admin session
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const sessionData = JSON.parse(adminSession);
      const expiryTime = new Date(sessionData.expiry);
      
      // If session hasn't expired, login automatically
      if (expiryTime > new Date()) {
        onLogin(sessionData.password);
      } else {
        // Clear expired session
        localStorage.removeItem('adminSession');
      }
    }
  }, [onLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set admin session with 60 minute expiry
    if (password === 'admin123') {
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 60);
      
      localStorage.setItem('adminSession', JSON.stringify({
        password,
        expiry: expiry.toISOString()
      }));
    }
    
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-hamptons-accent/10 p-3 rounded-full">
              <LockIcon className="h-6 w-6 text-hamptons-accent" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your password to access the admin area
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center"
              />
              <p className="text-xs text-muted-foreground text-center">
                For demo purposes, use: admin123
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
