
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useHeroFeatures } from '@/hooks/use-hero-features';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const { heroFeatures } = useHeroFeatures();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (heroFeatures && heroFeatures.length > 0) setLoading(false);
  }, [heroFeatures]);
  
  const cycleFeature = useCallback(() => {
    if (heroFeatures.length <= 1) return;
    setCurrentFeatureIndex(prev => prev >= heroFeatures.length - 1 ? 0 : prev + 1);
  }, [heroFeatures.length]);
  
  useEffect(() => {
    if (heroFeatures.length <= 1) return;
    const id = setInterval(cycleFeature, 10000);
    return () => clearInterval(id);
  }, [cycleFeature, heroFeatures.length]);
  
  useEffect(() => { setImageError(false); }, [currentFeatureIndex]);
  
  const currentFeature = heroFeatures[currentFeatureIndex] || {
    id: "", title: "Private East Hampton Escape", subtitle: "", imageUrl: "/hero-image.jpg", videoUrl: ""
  };
  
  const fallbackImage = "/hero-image.jpg";
  const heroBackgroundStyle = {
    backgroundImage: `url('${imageError ? fallbackImage : currentFeature.imageUrl}')`,
    backgroundSize: 'cover', backgroundPosition: 'center',
  };

  return (
    <div className="relative min-h-screen flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        {currentFeature.videoUrl && !imageError ? (
          <video key={currentFeature.id} autoPlay muted loop playsInline className="w-full h-full object-cover" poster={currentFeature.imageUrl || undefined} onError={() => setImageError(true)}>
            <source src={currentFeature.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 w-full h-full" style={heroBackgroundStyle} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent z-10" />
      </div>
      
      <div className="container-custom px-4 pb-24 pt-48 relative z-20 w-full">
        {loading ? (
          <div className="max-w-3xl">
            <Skeleton className="h-16 w-3/4 mb-4" />
            <Skeleton className="h-8 w-1/2 mb-8" />
          </div>
        ) : error ? (
          <div className="text-white bg-destructive/20 p-4 rounded-md">
            <div className="flex gap-2 items-center mb-2"><AlertCircle className="h-5 w-5" /><p className="font-medium">Error loading hero content</p></div>
            <p>{error}</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-medium">East Hampton, New York</span>
            </motion.div>

            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-[0.95] tracking-tight">
              Private East Hampton Escape — Pool, Space, and Total Privacy
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light mb-4 max-w-2xl leading-relaxed">
              Just 2 hours from NYC. A fully private home designed for relaxing weekends, group getaways, and summer stays.
            </p>
            <p className="text-accent/90 text-sm font-medium mb-10 uppercase tracking-wider">
              Summer weekends are booking fast — limited availability remaining
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold px-10 py-7 shadow-2xl transition-all duration-300 hover:scale-105 uppercase tracking-wider" asChild>
                <Link to="/properties">Check Availability</Link>
              </Button>
              <Button variant="outline" className="bg-transparent backdrop-blur-sm text-white border border-white/30 hover:bg-white/10 hover:border-white/60 text-base font-medium px-10 py-7 transition-all duration-300 uppercase tracking-wider" asChild>
                <Link to="/book-direct">Book Direct & Save on Fees</Link>
              </Button>
            </div>

            <p className="text-white/40 text-xs mt-4 tracking-wide">
              Fast response • No platform fees • Best rates direct
            </p>
            
            {heroFeatures.length > 1 && (
              <div className="flex mt-10 gap-2">
                {heroFeatures.map((_, index) => (
                  <button key={index} onClick={() => setCurrentFeatureIndex(index)} className={`h-1 rounded-full transition-all duration-500 ${index === currentFeatureIndex ? 'bg-accent w-12' : 'bg-white/30 w-6'}`} aria-label={`Go to feature ${index + 1}`} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
      
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </div>
  );
};

export default Hero;
