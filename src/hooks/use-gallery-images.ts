
import { useState, useEffect } from 'react';
import { fetchAirbnbImages } from '@/utils/airbnbScraper';
import { AirbnbImage } from '@/types/image';

export const useGalleryImages = (listingId: string) => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedImages = await fetchAirbnbImages(listingId);
        console.log("Gallery images loaded:", fetchedImages);
        
        if (fetchedImages.length === 0) {
          setError("No images available");
        } else {
          setImages(fetchedImages);
        }
      } catch (err) {
        console.error("Error loading gallery images:", err);
        setError("Failed to load gallery images");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [listingId]);

  return { images, loading, error };
};
