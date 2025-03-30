
import { useState, useEffect } from 'react';
import { AirbnbImage } from '@/types/image';
import { getImages } from '@/services/supabase-images';

export const useGalleryImages = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get images from Supabase
        const fetchedImages = await getImages();
        console.log("Gallery images loaded from Supabase:", fetchedImages);
        
        if (fetchedImages.length === 0) {
          setError("No images available in the database. Please add some in the admin panel.");
        } else {
          setImages(fetchedImages);
        }
      } catch (err: any) {
        console.error("Error loading gallery images:", err);
        // Provide a more detailed error message if Supabase credentials are missing
        if (err.message && err.message.includes('Supabase credentials are missing')) {
          setError("Supabase configuration error: Please set up your Supabase environment variables.");
        } else {
          setError("Failed to load gallery images from the database");
        }
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return { images, loading, error };
};
