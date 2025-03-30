
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface AdminNavbarProps {
  onLogout?: () => void;
}

const AdminNavbar = ({ onLogout }: AdminNavbarProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <a href="/" className="text-lg font-semibold text-hamptons-accent">
            Whooping Hollow
          </a>
          <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-md">
            Admin
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="/" 
            className="text-sm text-gray-600 hover:text-hamptons-accent transition-colors"
          >
            View Site
          </a>
          
          {onLogout && (
            <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
