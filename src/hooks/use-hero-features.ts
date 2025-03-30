
import { useState, useEffect } from 'react';

export type HeroFeature = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string;
};

export const useHeroFeatures = () => {
  const [heroFeatures, setHeroFeatures] = useState<HeroFeature[]>(() => {
    try {
      const savedFeatures = localStorage.getItem('heroFeatures');
      if (savedFeatures) {
        const parsedFeatures = JSON.parse(savedFeatures);
        if (Array.isArray(parsedFeatures) && parsedFeatures.length > 0) {
          return parsedFeatures;
        }
      }
    } catch (err) {
      console.error("Error parsing hero features:", err);
    }
    
    // Default feature
    return [{
      id: "default-feature",
      title: "Whooping Hollow Haven",
      subtitle: "A luxurious retreat in the heart of East Hampton",
      imageUrl: "/hero-image.jpg",
      videoUrl: "https://d3ioifgscy1qpn.cloudfront.net/videos/general/footer_video.mov.65e79d1da7050.mp4"
    }];
  });
  
  // Save features to localStorage when they change
  useEffect(() => {
    localStorage.setItem('heroFeatures', JSON.stringify(heroFeatures));
  }, [heroFeatures]);
  
  const updateHeroFeatures = (features: HeroFeature[]) => {
    setHeroFeatures(features);
  };
  
  return {
    heroFeatures,
    updateHeroFeatures
  };
};
