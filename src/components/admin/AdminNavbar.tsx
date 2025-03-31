
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminNavbarProps {
  onLogout: () => void;
  adminEmail?: string;
  adminAvatar?: string;
  adminName?: string;
}

const AdminNavbar = ({ onLogout, adminEmail, adminAvatar, adminName }: AdminNavbarProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom flex items-center justify-between py-3">
        <div className="flex items-center space-x-3 md:space-x-6">
          <Link to="/" className="flex items-center text-hamptons-dark hover:text-hamptons-accent transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className={isMobile ? "text-xs" : ""}>Back</span>
          </Link>
          
          <div className="hidden sm:flex items-center text-hamptons-dark font-bold">
            Admin Dashboard
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {adminEmail && (
            <div className="flex items-center text-sm">
              <Avatar className="h-7 w-7 mr-2">
                {adminAvatar ? (
                  <AvatarImage src={adminAvatar} alt={adminName || adminEmail} />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                    {(adminName || adminEmail).charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-gray-600 hidden sm:inline">{adminName || adminEmail}</span>
            </div>
          )}
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"} 
            onClick={onLogout}
            className="flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
