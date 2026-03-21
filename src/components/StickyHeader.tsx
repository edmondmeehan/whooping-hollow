
import React from 'react';
import { Link } from 'react-router-dom';

const StickyHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-foreground/95 backdrop-blur-sm border-b border-white/10">
      <div className="container-custom py-2">
        <div className="flex items-center justify-center gap-4 md:gap-8 text-xs md:text-sm">
          <Link to="/properties" className="text-white/70 hover:text-accent transition-colors font-medium uppercase tracking-wider">
            Check Availability
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/book-direct" className="text-white/70 hover:text-accent transition-colors font-medium uppercase tracking-wider">
            Book Direct
          </Link>
          <span className="text-white/20">|</span>
          <a href="sms:+19166165376" className="text-white/70 hover:text-accent transition-colors font-medium uppercase tracking-wider">
            Text to Book
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
