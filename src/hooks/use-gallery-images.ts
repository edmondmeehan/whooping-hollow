
import { useState, useEffect } from 'react';
import { AirbnbImage } from '@/types/image';
import { getImages } from '@/services/supabase-images';
import { fetchAirbnbImages } from '@/utils/airbnbScraper';

// Demo images to show when Supabase is not configured or has no data
const demoImages: AirbnbImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    alt: 'Demo House Exterior',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    alt: 'Demo Living Room',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    alt: 'Demo Kitchen',
    created_at: new Date().toISOString()
  },
  // Add a few more for variety
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    alt: 'Beautiful Patio',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    alt: 'Modern Home Exterior',
    created_at: new Date().toISOString()
  }
];

export const useGalleryImages = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingDemoImages, setUsingDemoImages] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingDemoImages(false);
        
        // Try to get images from Supabase
        const fetchedImages = await getImages();
        console.log("Gallery images loaded from Supabase:", fetchedImages);
        
        if (fetchedImages.length === 0) {
          console.log("No images found in database, using demo images");
          setImages(demoImages);
          setUsingDemoImages(true);
          setError("No images available in the database. Please add some in the admin panel.");
        } else {
          setImages(fetchedImages);
        }
      } catch (err: any) {
        console.error("Error loading gallery images:", err);
        
        // Fallback to scraper images if Supabase fails
        try {
          const scrapedImages = await fetchAirbnbImages('1314531825053234635');
          if (scrapedImages && scrapedImages.length > 0) {
            console.log("Fallback to scraped images");
            setImages(scrapedImages);
            setUsingDemoImages(true);
            setError("Could not connect to the database. Using fallback images.");
          } else {
            // If scraper also fails, use demo images
            console.log("Using demo images since Supabase and scraper failed");
            setImages(demoImages);
            setUsingDemoImages(true);
            setError("Demo mode: Supabase connection failed. Using sample images.");
          }
        } catch (scrapeErr) {
          console.log("Using demo images as final fallback");
          setImages(demoImages);
          setUsingDemoImages(true);
          setError("Demo mode: Supabase is not configured. Using sample images.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return { images, loading, error, usingDemoImages };
};
