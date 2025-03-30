
import { useState, useEffect } from 'react';
import { heroFeaturesStorage } from '@/services/hero-features-storage';

/**
 * Hero feature interface representing a homepage hero section item
 */
export interface HeroFeature {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string;
}

/**
 * Hook return type
 */
export interface UseHeroFeaturesReturn {
  /** Current hero features */
  heroFeatures: HeroFeature[];
  /** Function to update hero features */
  updateHeroFeatures: (features: HeroFeature[]) => void;
}

/**
 * Custom hook for managing hero features
 * Handles loading, saving, and updating hero features
 */
export const useHeroFeatures = (): UseHeroFeaturesReturn => {
  // Initialize state with features from storage
  const [heroFeatures, setHeroFeatures] = useState<HeroFeature[]>(() => {
    const features = heroFeaturesStorage.getFeatures();
    console.log("Loaded hero features from storage:", features);
    return features;
  });
  
  // Save features to storage when they change
  useEffect(() => {
    console.log("Saving hero features to storage:", heroFeatures);
    heroFeaturesStorage.saveFeatures(heroFeatures);
  }, [heroFeatures]);
  
  // Update hero features
  const updateHeroFeatures = (features: HeroFeature[]): void => {
    console.log("Updating hero features:", features);
    setHeroFeatures(features);
  };
  
  return {
    heroFeatures,
    updateHeroFeatures
  };
};
