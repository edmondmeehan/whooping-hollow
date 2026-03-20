
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Anchor } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-xl shadow-[var(--shadow-elegant)] border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Anchor className={`w-6 h-6 transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`} />
            <span className={`text-xl md:text-2xl font-serif font-bold tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}>
              Whooping Hollow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/local-area', label: 'The Area' },
              { to: '/guide', label: 'Guest Guide' },
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
                  scrolled 
                    ? 'text-foreground hover:text-primary after:bg-primary' 
                    : 'text-white/90 hover:text-white after:bg-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold uppercase tracking-wider text-xs px-6" 
              asChild
            >
              <Link to="/properties">
                Reserve Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-white'}`}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl rounded-xl mt-4 border border-border/50"
            >
              <div className="p-6 space-y-4">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/local-area', label: 'The Area' },
                  { to: '/guide', label: 'Guest Guide' },
                ].map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="block py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium uppercase tracking-wider text-sm"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold uppercase tracking-wider text-xs" asChild>
                  <Link 
                    to="/properties" 
                    className="flex items-center justify-center w-full"
                    onClick={toggleMenu}
                  >
                    Reserve Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
