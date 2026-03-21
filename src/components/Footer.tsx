
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Anchor } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white/80 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-5 h-5 text-accent" />
              <span className="text-xl font-serif font-bold text-white">Whooping Hollow</span>
            </div>
            <p className="text-white/50 leading-relaxed max-w-sm mb-6">
              A luxurious retreat in the heart of East Hampton. Where coastal elegance meets sophisticated living.
            </p>
            <div className="flex space-x-4">
              {[
                { href: '#', icon: Instagram },
                { href: '#', icon: Facebook },
                { href: 'mailto:info@whoopinghollow.com', icon: Mail },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40 mb-4">Navigate</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/local-area', label: 'The Area' },
                { to: '/properties', label: 'Availability' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/50 hover:text-accent transition-colors duration-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-white/50">
              <p>East Hampton, NY</p>
              <p>United States</p>
              <a href="mailto:info@whoopinghollow.com" className="block hover:text-accent transition-colors duration-300">
                info@whoopinghollow.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/30 text-xs uppercase tracking-wider">
            © {new Date().getFullYear()} Whooping Hollow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
