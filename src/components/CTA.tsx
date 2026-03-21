
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CTA = () => {
  const benefits = [
    'Best Available Rate',
    'No Platform Fees',
    'Fast Response',
    'No Hidden Costs',
  ];

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
            Avoid platform fees and get the best available rate by booking directly with us. Fast response. No hidden costs. Better experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-foreground/70">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold px-12 py-7 shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider group" 
            asChild
          >
            <Link to="/book-direct" className="flex items-center gap-2">
              Book Your Stay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <p className="mt-8 text-muted-foreground text-sm">
            Prefer to text? <a href="sms:+1XXXXXXXXXX" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors">Text us to book</a> · <a href="mailto:info@whoopinghollow.com" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors">info@whoopinghollow.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
