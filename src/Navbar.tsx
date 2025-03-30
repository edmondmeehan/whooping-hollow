
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from '@/hooks/use-pathname';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Determine if current path is admin area to show different styling
  const isAdminPage = pathname.includes('/admin');
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 shadow-sm backdrop-blur-md",
      isAdminPage ? "bg-hamptons-dark/90" : "bg-white/70"
    )}>
      <div className="container-custom flex items-center justify-between h-20">
        <div className="flex items-center">
          <Link to="/">
            <h1 className={cn(
              "text-2xl font-serif font-bold",
              isAdminPage ? "text-white" : "text-hamptons-dark"
            )}>
              Whooping Hollow
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "font-medium transition duration-200",
              isAdminPage ? "text-white hover:text-white/80" : "text-hamptons-dark hover:text-hamptons-accent"
            )}
          >
            Home
          </Link>
          
          <Link 
            to="/properties" 
            className={cn(
              "font-medium transition duration-200",
              isAdminPage ? "text-white hover:text-white/80" : "text-hamptons-dark hover:text-hamptons-accent"
            )}
          >
            Properties
          </Link>
          
          <Link to="/admin" className={cn(
            "font-medium transition duration-200",
            isAdminPage ? "text-white hover:text-white/80" : "text-hamptons-dark hover:text-hamptons-accent"
          )}>
            Admin
          </Link>
          
          <Button className="bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90">
            <a 
              href="https://www.airbnb.com/rooms/1314531825053234635" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Book Now
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className={isAdminPage ? "text-white" : "text-hamptons-dark"} size={24} />
          ) : (
            <Menu className={isAdminPage ? "text-white" : "text-hamptons-dark"} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container-custom py-4 space-y-4">
            <Link
              to="/"
              className="block font-medium text-hamptons-dark hover:text-hamptons-accent py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/properties"
              className="block font-medium text-hamptons-dark hover:text-hamptons-accent py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>
            
            <Link
              to="/admin"
              className="block font-medium text-hamptons-dark hover:text-hamptons-accent py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
            
            <Button className="w-full bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90">
              <a 
                href="https://www.airbnb.com/rooms/1314531825053234635" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center"
              >
                Book Now
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
