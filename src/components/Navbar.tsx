
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-serif font-semibold text-hamptons-dark">
              Whooping Hollow
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-hamptons-dark hover:text-coastal-600 transition-colors">
              Home
            </Link>
            <Button className="bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90" asChild>
              <Link to="/properties" className="flex items-center">
                Book Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-hamptons-dark hover:text-coastal-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-hamptons-dark hover:text-coastal-600 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Button className="w-full bg-hamptons-accent text-hamptons-dark hover:bg-hamptons-accent/90" asChild>
              <Link 
                to="/properties" 
                className="flex items-center justify-center w-full"
                onClick={toggleMenu}
              >
                Book Now
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
