import React, { useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useHeroFeatures } from '@/hooks/use-hero-features';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { heroFeatures } = useHeroFeatures();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (heroFeatures && heroFeatures.length > 0) {
      setLoading(false);
    }
  }, [heroFeatures]);
  
  const cycleFeature = useCallback(() => {
    if (heroFeatures.length <= 1) return;
    setCurrentFeatureIndex(prevIndex => 
      prevIndex >= heroFeatures.length - 1 ? 0 : prevIndex + 1
    );
  }, [heroFeatures.length]);
  
  useEffect(() => {
    if (heroFeatures.length <= 1) return;
    
    const intervalId = setInterval(cycleFeature, 10000);
    return () => clearInterval(intervalId);
  }, [cycleFeature, heroFeatures.length]);
  
  useEffect(() => {
    setImageError(false);
  }, [currentFeatureIndex]);
  
  const currentFeature = heroFeatures[currentFeatureIndex] || {
    id: "",
    title: "Your Private Hamptons Sanctuary",
    subtitle: "Where coastal elegance meets refined luxury • Minutes from pristine beaches",
    imageUrl: "/hero-image.jpg",
    videoUrl: ""
  };
  
  const handleImageError = () => {
    console.error("Failed to load hero image:", currentFeature.imageUrl);
    setImageError(true);
  };
  
  const defaultStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  const fallbackImage = "/hero-image.jpg";
  
  const heroBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(20, 50, 70, 0.25), rgba(20, 50, 70, 0.4)), url('${imageError ? fallbackImage : currentFeature.imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="hero-section flex items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/30 to-primary/40 z-10"></div>
        {currentFeature.videoUrl && !imageError ? (
          <video
            key={currentFeature.id}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={currentFeature.imageUrl || undefined}
            onError={() => {
              console.error("Video failed to load:", currentFeature.videoUrl);
              setImageError(true);
            }}
          >
            <source src={currentFeature.videoUrl} type="video/mp4" />
            <div 
              className="absolute inset-0 w-full h-full" 
              style={heroBackgroundStyle}
            ></div>
          </video>
        ) : (
          <div 
            className="absolute inset-0 w-full h-full" 
            style={imageError ? defaultStyle : heroBackgroundStyle}
            onLoad={() => setImageError(false)}
            onError={handleImageError}
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
            <div className="flex gap-2 items-center justify-center mb-2">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">Error loading hero content</p>
            </div>
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
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 drop-shadow-2xl tracking-tight">
              {currentFeature.title}
            </h1>
            <p className="text-white/95 text-lg md:text-xl lg:text-2xl font-light mb-10 max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
              {currentFeature.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-semibold px-10 py-7 shadow-2xl transition-all duration-300 hover:scale-105" 
                asChild
              >
                <Link to="/book-direct" className="flex items-center">
                  Reserve Your Stay
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/95 backdrop-blur-md text-primary border-2 border-white hover:bg-white hover:scale-105 text-lg font-semibold px-10 py-7 shadow-2xl transition-all duration-300"
                asChild
              >
                <a href="#about" className="flex items-center">
                  Explore the Property
                </a>
              </Button>
            </div>
            
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
