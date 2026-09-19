
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

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
    <div>
      <form onSubmit={handleMagicLinkLogin}>
        <div className="space-y-7">
          <div className="group">
            <label htmlFor="admin-email" className="mb-3 block text-[10px] font-bold uppercase text-admin-muted transition-colors group-focus-within:text-admin-ink">Email address</label>
            <Input
              id="admin-email"
              type="email"
              placeholder="name@whoopinghollow.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-none border-x-0 border-t-0 border-admin-line bg-transparent px-0 text-sm text-admin-ink shadow-none placeholder:text-admin-muted/60 focus-visible:border-admin-ink focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLocked || isLoadingMagicLink}
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="h-12 w-full rounded-sm bg-admin-ink text-xs font-bold uppercase text-admin-bg hover:bg-admin-body"
            disabled={isLocked || !email || isLoadingMagicLink}
          >
            {isLoadingMagicLink && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoadingMagicLink ? 'Sending Magic Link...' : 'Send Magic Link'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
