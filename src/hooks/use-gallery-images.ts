
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
        const fetchedImages = await getImages();
        console.log("Gallery images loaded from Supabase:", fetchedImages);
        
        if (fetchedImages.length === 0) {
          setError("No images available in the database");
        } else {
          setImages(fetchedImages);
        }
      } catch (err) {
        console.error("Error loading gallery images:", err);
        setError("Failed to load gallery images from the database");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return { images, loading, error };
};
