
import { useState, useEffect, useCallback } from 'react';
import { AirbnbImage } from '@/types/image';
import { useImageService } from './images/image-service';
import { useImageAddOperations } from './images/image-add-operations';
import { useImageEditOperations } from './images/image-edit-operations';
import { useToast } from '@/hooks/use-toast';

export const useImages = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchImages } = useImageService();
  const { toast } = useToast();

  const addOperations = useImageAddOperations(images, setImages, setLoading);
  const editOperations = useImageEditOperations(images, setImages, setLoading);

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading images from database...');
      const fetchedImages = await fetchImages();
      console.log('Fetched images:', fetchedImages);
      setImages(fetchedImages);
    } catch (error: any) {
      console.error('Error in loadImages:', error);
      setError(error.message || 'Failed to load images from database');
      toast({
        title: 'Error loading images',
        description: error.message || 'Failed to load images from database',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [fetchImages, toast]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const refreshImages = () => {
    loadImages();
  };

  return {
    images,
    loading,
    error,
    refreshImages,
    ...addOperations,
    ...editOperations
  };
};
