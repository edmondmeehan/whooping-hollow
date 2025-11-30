
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-[400px] md:h-[500px] mb-16 rounded-xl overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/east-hampton-beach.webp)' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 drop-shadow-lg">
          Discover East Hampton & Sag Harbor
        </h1>
        <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto font-sans drop-shadow-md">
          Experience the charm, beauty, and culture of the Hamptons' most beloved coastal communities.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
