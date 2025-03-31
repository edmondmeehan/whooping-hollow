
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft, User, ExternalLink } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AdminNavbarProps {
  onLogout: () => void;
  adminEmail?: string;
  adminAvatar?: string;
  adminName?: string;
}

const AdminNavbar = ({ onLogout, adminEmail, adminAvatar, adminName }: AdminNavbarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container-custom flex items-center justify-between py-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center text-hamptons-dark hover:text-hamptons-accent transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Site</span>
          </Link>
          
          <div className="flex items-center text-hamptons-dark font-bold">
            Admin Dashboard
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://staymarquis.com/owners" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-hamptons-dark hover:text-hamptons-accent transition-colors flex items-center"
                >
                  <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                    StayMarquis Portal
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                  <ExternalLink className="h-5 w-5 sm:hidden" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open StayMarquis Owner Portal</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {adminEmail && (
            <div className="flex items-center mr-2 text-sm">
              <Avatar className="h-8 w-8 mr-2">
                {adminAvatar ? (
                  <AvatarImage src={adminAvatar} alt={adminName || adminEmail} />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-700">
                    {(adminName || adminEmail).charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-gray-600 hidden sm:inline">{adminName || adminEmail}</span>
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm" 
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
