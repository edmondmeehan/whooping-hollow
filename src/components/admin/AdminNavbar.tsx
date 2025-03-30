
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <nav className="bg-hamptons-dark text-white py-4">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
          <h1 className="text-xl font-medium ml-4">Whooping Hollow Haven Admin</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
