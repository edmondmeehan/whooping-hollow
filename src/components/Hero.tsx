
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { getHeroImage } from '@/utils/airbnbScraper';
import { Skeleton } from './ui/skeleton';
import { useHeroFeatures } from '@/hooks/use-hero-features';

const Hero = () => {
  const { heroFeatures } = useHeroFeatures();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check if we have features and set loading state
  useEffect(() => {
    if (heroFeatures && heroFeatures.length > 0) {
      setLoading(false);
    }
  }, [heroFeatures]);
  
  // Function to cycle to the next feature
  const cycleFeature = useCallback(() => {
    if (heroFeatures.length <= 1) return;
    setCurrentFeatureIndex(prevIndex => 
      prevIndex >= heroFeatures.length - 1 ? 0 : prevIndex + 1
    );
  }, [heroFeatures.length]);
  
  // Auto cycle features every 10 seconds
  useEffect(() => {
    if (heroFeatures.length <= 1) return;
    
    const intervalId = setInterval(cycleFeature, 10000);
    return () => clearInterval(intervalId);
  }, [cycleFeature, heroFeatures.length]);
  
  // Get current feature
  const currentFeature = heroFeatures[currentFeatureIndex] || {
    id: "",
    title: "",
    subtitle: "",
    imageUrl: "",
    videoUrl: ""
  };
  
  // Default linear gradient while image loads
  const defaultStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  // Hero style with loaded image (as fallback)
  const heroBackgroundStyle = currentFeature.imageUrl ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${currentFeature.imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : defaultStyle;

  return (
    <div className="hero-section flex items-center justify-center text-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {currentFeature.videoUrl ? (
          <video
            key={currentFeature.id} // Key to force recreation when feature changes
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={currentFeature.imageUrl || undefined}
          >
            <source src={currentFeature.videoUrl} type="video/mp4" />
            {/* Fallback to static image if video fails */}
            <div 
              className="absolute inset-0 w-full h-full" 
              style={heroBackgroundStyle}
            ></div>
          </video>
        ) : (
          <div 
            className="absolute inset-0 w-full h-full" 
            style={heroBackgroundStyle}
          ></div>
        )}
      </div>
      
      <div className="container-custom px-4 py-32 md:py-48 relative z-20">
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
        ) : error ? (
          <div className="text-white bg-red-500/20 p-4 rounded-md">
            <p>{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-white text-red-500"
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">
              {currentFeature.title}
            </h1>
            <p className="text-white text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto">
              {currentFeature.subtitle}
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
            
            {/* Feature Indicators (only show if multiple features) */}
            {heroFeatures.length > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {heroFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeatureIndex(index)}
                    className={`h-2 w-8 rounded-full transition-all duration-300 ${
                      index === currentFeatureIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  ></button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
