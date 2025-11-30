
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent } from '@/components/ui/card';
import { Mail, Loader2 } from 'lucide-react';

interface AdminLoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  handleMagicLinkLogin: (e?: React.FormEvent) => void;
  isLocked: boolean;
  isLoadingMagicLink: boolean;
}

const AdminLoginForm = ({
  email,
  setEmail,
  handleMagicLinkLogin,
  isLocked,
  isLoadingMagicLink,
}: AdminLoginFormProps) => {
  return (
    <CardContent className="pt-6">
      <form onSubmit={handleMagicLinkLogin}>
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isLocked || isLoadingMagicLink}
              required
            />
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            We'll send you a secure magic link to sign in
          </p>

          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLocked || !email || isLoadingMagicLink}
          >
            {isLoadingMagicLink && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoadingMagicLink ? 'Sending Magic Link...' : 'Send Magic Link'}
          </Button>
        </div>
      </form>
    </CardContent>
  );
};

export default AdminLoginForm;
