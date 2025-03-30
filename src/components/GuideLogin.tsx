
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GuideLoginProps {
  onLogin: (username: string, password: string) => void;
}

const GuideLogin = ({ onLogin }: GuideLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-coastal-600/10 p-3 rounded-full">
              <BookIcon className="h-6 w-6 text-coastal-600" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Guest Guide Access</CardTitle>
          <CardDescription className="text-center">
            Please enter your credentials to access the guest guide
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground text-center">
                For demo purposes, use: guest / guide123
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-coastal-600 hover:bg-coastal-700">
              Access Guide
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GuideLogin;
