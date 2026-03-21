
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Book Direct</span>
            <div className="h-px w-12 bg-accent" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            Book Direct & Save
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            Avoid platform fees and get the best experience by booking directly. Quick responses, better pricing, and a more personal stay.
          </p>
          
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold px-12 py-7 shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider group" asChild>
            <Link to="/book-direct" className="flex items-center gap-2">
              Book Your Stay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
