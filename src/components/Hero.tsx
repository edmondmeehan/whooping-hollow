
import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  const heroBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/dd42ec84-5df3-43bf-9da9-ce67e57f1422.jpeg?im_w=1200')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="hero-section flex items-center justify-center text-center" style={heroBackgroundStyle}>
      <div className="container-custom px-4 py-32 md:py-48">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">
          Whooping Hollow Haven
        </h1>
        <p className="text-white text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
          A luxurious retreat in the heart of East Hampton
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-hamptons-accent text-hamptons-dark text-lg font-medium hover:bg-hamptons-accent/90 px-8 py-6">
            <a 
              href="https://www.airbnb.com/rooms/1314531825053234635" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Book Now
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white/30 text-lg font-medium px-8 py-6"
          >
            <a href="#about" className="flex items-center">
              Learn More
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
