
import React from 'react';
import { ExternalLink, Home } from 'lucide-react';
import { Button } from './ui/button';

const OtherPropertiesBanner: React.FC = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10" />
      <div className="absolute inset-0 border-y border-accent/20" />
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Home className="w-5 h-5 text-accent" />
            <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
              More Places to Stay
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
            Explore Our Other Properties
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            From Nashville to the Hamptons — check out our full collection of vacation rentals on Airbnb.
          </p>
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold uppercase tracking-wider text-sm px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            asChild
          >
            <a 
              href="https://www.airbnb.com/l/AX0OyBLA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View All Properties on Airbnb
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OtherPropertiesBanner;
