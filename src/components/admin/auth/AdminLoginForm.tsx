
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from '@/components/ui/card';
import { LockIcon, UserIcon, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdminLoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handlePasswordLogin: (e: React.FormEvent) => void;
  handleMagicLinkLogin: (e?: React.FormEvent) => void;
  isLocked: boolean;
  isLoadingMagicLink: boolean;
  formattedTime: string;
}

const AdminLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handlePasswordLogin,
  handleMagicLinkLogin,
  isLocked,
  isLoadingMagicLink,
  formattedTime
}: AdminLoginFormProps) => {
  const [activeTab, setActiveTab] = useState('password');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <CardContent className="pt-6">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <form onSubmit={handlePasswordLogin}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
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
                  <LockIcon className="h-4 w-4 text-muted-foreground" />
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
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLocked || !email || !password}
              >
                {isLocked ? `Locked (${formattedTime})` : 'Login with Password'}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="magic-link">
          <form onSubmit={handleMagicLinkLogin}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLocked || isLoadingMagicLink}
                  required
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                We'll send you a magic link to sign in without a password
              </p>

              <Button 
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isLocked || !email || isLoadingMagicLink}
              >
                {isLoadingMagicLink && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoadingMagicLink ? 'Sending...' : 'Send Magic Link'}
              </Button>
            </div>
          </form>
        </TabsContent>
      </CardContent>
    </Tabs>
  );
};

export default AdminLoginForm;
