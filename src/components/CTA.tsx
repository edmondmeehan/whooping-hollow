
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-28 coastal-gradient text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container-custom text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 luxury-text">
          Reserve Your Escape Today
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Book directly for the best rates, exclusive perks, and our dedicated concierge service.
        </p>
        
        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Best Price Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">No Booking Fees</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Flexible Cancellation</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">24/7 Concierge</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold px-12 py-7 shadow-2xl hover:scale-105 transition-all duration-300" 
            asChild
          >
            <Link to="/book-direct" className="flex items-center">
              Book Direct & Save
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/95 text-primary border-2 border-white hover:bg-white hover:scale-105 text-lg font-semibold px-12 py-7 shadow-2xl transition-all duration-300" 
            asChild
          >
            <Link to="/properties" className="flex items-center">
              View Availability
            </Link>
          </Button>
        </div>
        
        <p className="mt-10 text-white/80 text-sm">
          Questions? Contact us at <a href="mailto:info@whoopinghollow.com" className="underline hover:text-white">info@whoopinghollow.com</a>
        </p>
      </div>
    </section>
  );
};

export default CTA;
