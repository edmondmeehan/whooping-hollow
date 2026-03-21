
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-primary/10" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            Plan Your Hamptons
            <br />
            <span className="text-accent">Escape Now</span>
          </h2>
          
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold px-12 py-7 shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider group" 
            asChild
          >
            <Link to="/properties" className="flex items-center gap-2">
              Check Availability
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
