
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-background/95 backdrop-blur-lg sticky top-0 z-50 shadow-[var(--shadow-soft)] border-b border-border">
      <div className="container-custom py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              Whooping Hollow
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link to="/local-area" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
              The Area
            </Link>
            <Link to="/guide" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
              Guest Guide
            </Link>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-300 font-semibold" asChild>
              <Link to="/properties" className="flex items-center">
                Reserve Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-6 pb-4 space-y-5 animate-fade-in">
            <Link 
              to="/" 
              className="block py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/local-area" 
              className="block py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
              onClick={toggleMenu}
            >
              The Area
            </Link>
            <Link 
              to="/guide" 
              className="block py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
              onClick={toggleMenu}
            >
              Guest Guide
            </Link>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" asChild>
              <Link 
                to="/properties" 
                className="flex items-center justify-center w-full"
                onClick={toggleMenu}
              >
                Reserve Now
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
