
import { HeroFeature } from '@/hooks/use-hero-features';

const STORAGE_KEY = 'heroFeatures';

/**
 * Service for managing hero features persistence in local storage
 */
export const heroFeaturesStorage = {
  /**
   * Get hero features from local storage
   */
  getFeatures: (): HeroFeature[] => {
    try {
      console.log("Retrieving hero features from storage");
      const savedFeatures = localStorage.getItem(STORAGE_KEY);
      if (savedFeatures) {
        const parsedFeatures = JSON.parse(savedFeatures);
        if (Array.isArray(parsedFeatures) && parsedFeatures.length > 0) {
          console.log("Successfully retrieved hero features:", parsedFeatures);
          return parsedFeatures;
        }
      }
    } catch (err) {
      console.error("Error retrieving hero features from storage:", err);
    }
    
    // Return default feature if nothing valid in storage
    const defaultFeature = {
      id: "default-feature",
      title: "Whooping Hollow",
      subtitle: "A luxurious retreat in the heart of East Hampton",
      imageUrl: "/hero-image.jpg",
      videoUrl: "https://d3ioifgscy1qpn.cloudfront.net/videos/general/footer_video.mov.65e79d1da7050.mp4"
    };
    
    console.log("Using default hero feature:", defaultFeature);
    return [defaultFeature];
  },
  
  /**
   * Save hero features to local storage
   */
  saveFeatures: (features: HeroFeature[]): void => {
    try {
      console.log("Saving hero features to storage:", features);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(features));
    } catch (err) {
      console.error("Error saving hero features to storage:", err);
    }
  }
};
