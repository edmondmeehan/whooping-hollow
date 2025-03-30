
import { useState, useEffect, useCallback } from 'react';
import { AirbnbImage } from '@/types/image';
import { useImageService } from './images/image-service';
import { useImageAddOperations } from './images/image-add-operations';
import { useImageEditOperations } from './images/image-edit-operations';

export const useImages = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchImages } = useImageService();

  const addOperations = useImageAddOperations(images, setImages, setLoading);
  const editOperations = useImageEditOperations(images, setImages, setLoading);

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error('Error in loadImages:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchImages]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const refreshImages = () => {
    loadImages();
  };

  return {
    images,
    loading,
    refreshImages,
    ...addOperations,
    ...editOperations
  };
};
