
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookIcon, UserIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

interface GuideLoginProps {
  onLogin: (username: string, password: string) => boolean;
}

const GuideLogin = ({ onLogin }: GuideLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const success = onLogin(username, password);
      
      if (!success) {
        setError('Invalid username or password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 pt-20">
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LockIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="bg-gray-100 p-4 rounded-lg mt-6">
                <p className="text-sm text-gray-700 mb-2">Hint:</p>
                <p className="text-xs text-gray-600">
                  Login information is available in the guest information/WiFi information at the house and in the check-in email you received.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-coastal-600 hover:bg-coastal-700"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Access Guide"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GuideLogin;
