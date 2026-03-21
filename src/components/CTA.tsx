
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CTA = () => {
  const benefits = [
    'Best Price Guarantee',
    'No Booking Fees',
    'Flexible Cancellation',
    '24/7 Concierge',
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Book Direct</span>
            <div className="h-px w-12 bg-accent" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Reserve Your
            <br />
            <span className="text-accent">Escape Today</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed">
            Book directly for the best rates, exclusive perks, and our dedicated concierge service.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold px-12 py-7 shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider group" 
              asChild
            >
              <Link to="/book-direct" className="flex items-center gap-2">
                Book Direct & Save
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40 text-base font-medium px-12 py-7 transition-all duration-300 uppercase tracking-wider" 
              asChild
            >
              <Link to="/properties">View Availability</Link>
            </Button>
          </div>
          
          <p className="mt-12 text-white/40 text-sm">
            Questions? <a href="mailto:info@whoopinghollow.com" className="text-accent/80 hover:text-accent underline-offset-4 hover:underline transition-colors">info@whoopinghollow.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
