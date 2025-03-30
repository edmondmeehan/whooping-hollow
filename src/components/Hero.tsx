
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { getHeroImage } from '@/utils/airbnbScraper';
import { Skeleton } from './ui/skeleton';

const Hero = () => {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const listingId = '1314531825053234635'; // This should be configurable

  useEffect(() => {
    const loadHeroImage = async () => {
      setLoading(true);
      const imageUrl = await getHeroImage(listingId);
      setHeroImageUrl(imageUrl);
      setLoading(false);
    };

    loadHeroImage();
  }, [listingId]);

  // Default linear gradient while image loads
  const defaultStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  // Hero style with loaded image
  const heroBackgroundStyle = heroImageUrl ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${heroImageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : defaultStyle;

  return (
    <div className="hero-section flex items-center justify-center text-center" style={heroBackgroundStyle}>
      <div className="container-custom px-4 py-32 md:py-48">
        {loading ? (
          <>
            <div className="mx-auto mb-6">
              <Skeleton className="h-16 w-3/4 mx-auto" />
            </div>
            <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Skeleton className="h-14 w-32 mx-auto sm:mx-0" />
              <Skeleton className="h-14 w-32 mx-auto sm:mx-0" />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
