
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from '@/components/ui/card';
import { LockIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLocked: boolean;
  formattedTime: string;
}

const AdminLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  isLocked,
  formattedTime
}: AdminLoginFormProps) => {
  return (
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
          
          <div className="flex justify-end">
            <Link 
              to="/admin/forgot-password" 
              className="text-xs text-hamptons-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90"
          disabled={isLocked || !email || !password}
        >
          {isLocked ? `Locked (${formattedTime})` : 'Login'}
        </Button>
      </CardFooter>
    </form>
  );
};

export default AdminLoginForm;
