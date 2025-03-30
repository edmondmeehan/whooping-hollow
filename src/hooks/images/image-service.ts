
import { AirbnbImage } from '@/types/image';
import { getImages } from '@/services/supabase-images';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback } from 'react';
import { imageCache } from './image-cache';
import { demoAdminImages } from './demo-images';
import { useImageCrudService } from './image-crud-service';
import { useImageUploadService } from './image-upload-service';

export const useImageService = () => {
  const { toast } = useToast();
  const [cachedImages, setCachedImages] = useState<AirbnbImage[] | null>(null);
  const { createImage, modifyImage, removeImage } = useImageCrudService();
  const { uploadImageFile } = useImageUploadService();

  const fetchImages = useCallback(async () => {
    // First, check the in-memory cache
    const cachedResult = imageCache.get();
    if (cachedResult) {
      console.log('Returning images from cache');
      setCachedImages(cachedResult);
      return cachedResult;
    }

    try {
      console.log('Attempting to fetch images from Supabase');
      const fetchedImages = await getImages();
      console.log('Successfully fetched images:', fetchedImages);
      
      // Store in cache
      imageCache.set(fetchedImages);
      setCachedImages(fetchedImages);
      
      return fetchedImages;
    } catch (error: any) {
      console.error('Error loading images:', error);
      toast({
        title: 'Database Connection Error',
        description: 'Failed to load images from database. Using demo images.',
        variant: 'destructive',
      });
      
      // Return demo images as fallback
      imageCache.set(demoAdminImages);
      setCachedImages(demoAdminImages);
      return demoAdminImages;
    }
  }, [toast]);

  return {
    fetchImages,
    createImage,
    modifyImage, 
    removeImage,
    uploadImageFile,
    cachedImages
  };
};
