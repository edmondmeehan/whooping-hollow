
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AdminNavbarProps {
  onLogout: () => void;
  adminEmail?: string;
  adminAvatar?: string;
  adminName?: string;
  title: string;
}

const AdminNavbar = ({ onLogout, adminEmail, adminAvatar, adminName, title }: AdminNavbarProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-admin-line bg-admin-bg/95 px-4 backdrop-blur-sm sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="h-9 w-9 rounded-sm text-admin-body hover:bg-admin-strip hover:text-admin-ink" />
          <div className="h-5 w-px bg-admin-line" />
          <h1 className="truncate text-base font-bold text-admin-ink sm:text-lg">{title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {adminEmail && (
            <div className="flex items-center text-sm">
              <Avatar className="mr-2 h-8 w-8 border border-admin-line">
                {adminAvatar ? (
                  <AvatarImage src={adminAvatar} alt={adminName || adminEmail} />
                ) : (
                  <AvatarFallback className="bg-admin-strip text-xs text-admin-ink">
                    {(adminName || adminEmail).charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="hidden max-w-52 truncate text-xs text-admin-muted sm:inline">{adminName || adminEmail}</span>
            </div>
          )}
          <Button 
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="h-9 w-9 rounded-sm text-admin-muted hover:bg-admin-strip hover:text-admin-ink"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
    </header>
  );
};

export default AdminNavbar;
