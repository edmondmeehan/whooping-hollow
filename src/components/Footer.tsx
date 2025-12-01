
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-hamptons-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Whooping Hollow</h3>
            <p className="text-coastal-100 mb-4">
              A luxurious retreat in the heart of East Hampton, New York.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-hamptons-accent hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-hamptons-accent hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="mailto:info@whoopinghollow.com" className="text-hamptons-accent hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-coastal-100 hover:text-hamptons-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-coastal-100 hover:text-hamptons-accent transition-colors">
                  Guest Guide
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.airbnb.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-coastal-100 hover:text-hamptons-accent transition-colors"
                >
                  Book on Airbnb
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Contact</h3>
            <p className="text-coastal-100 mb-2">Whooping Hollow</p>
            <p className="text-coastal-100 mb-2">East Hampton, NY</p>
            <p className="text-coastal-100">United States</p>
          </div>
        </div>

        <div className="border-t border-coastal-700 mt-8 pt-8 text-center text-coastal-400">
          <p>© {new Date().getFullYear()} Whooping Hollow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
