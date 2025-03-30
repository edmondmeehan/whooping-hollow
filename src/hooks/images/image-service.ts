import { AirbnbImage } from '@/types/image';
import { getImages, addImage, updateImage, deleteImage, uploadImage } from '@/services/supabase-images';
import { useToast } from '@/hooks/use-toast';
import { useState, useCallback } from 'react';

// In-memory cache with expiration
const imageCache = {
  data: null as AirbnbImage[] | null,
  timestamp: 0,
  
  get() {
    // Check if cache exists and is less than 5 minutes old
    const currentTime = Date.now();
    if (this.data && (currentTime - this.timestamp) < 5 * 60 * 1000) {
      return this.data;
    }
    return null;
  },
  
  set(images: AirbnbImage[]) {
    this.data = images;
    this.timestamp = Date.now();
  },
  
  clear() {
    this.data = null;
    this.timestamp = 0;
  }
};

// Fallback demo images when database connection fails
const demoAdminImages: AirbnbImage[] = [
  {
    id: 101,
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    alt: 'Demo Property Exterior',
    created_at: new Date().toISOString()
  },
  {
    id: 102,
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    alt: 'Demo Living Room',
    created_at: new Date().toISOString()
  }
];

export const useImageService = () => {
  const { toast } = useToast();
  const [cachedImages, setCachedImages] = useState<AirbnbImage[] | null>(null);

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

  const createImage = async (newImage: AirbnbImage) => {
    try {
      console.log('Attempting to create image in Supabase:', newImage);
      const addedImage = await addImage(newImage);
      if (addedImage) {
        // Clear cache to force refetch
        imageCache.clear();
        toast({
          title: 'Success',
          description: 'Image added successfully to database',
        });
      }
      return addedImage;
    } catch (error: any) {
      console.error('Error adding image:', error);
      
      // Provide more specific error message
      const errorMsg = error.message?.includes('Supabase credentials') 
        ? 'Supabase is not configured. Please set up your database connection.'
        : 'Failed to add image to database';
      
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      
      // Create a mock response with timestamp for demo purposes
      const mockImage: AirbnbImage = {
        ...newImage,
        id: Math.floor(Math.random() * 1000) + 200,
        created_at: new Date().toISOString()
      };
      return mockImage;
    }
  };

  const modifyImage = async (id: number, image: AirbnbImage) => {
    try {
      const updatedImage = await updateImage(id, image);
      if (updatedImage) {
        // Clear cache to force refetch
        imageCache.clear();
        toast({
          title: 'Success',
          description: 'Image updated successfully in database',
        });
      }
      return updatedImage;
    } catch (error: any) {
      console.error('Error updating image:', error);
      
      // Provide more helpful message based on the error
      const errorMsg = error.message?.includes('Supabase credentials') 
        ? 'Supabase is not configured. Updates will only be temporary.'
        : 'Failed to update image in database';
      
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      
      // Create a mock updated image for the UI
      const mockUpdated: AirbnbImage = {
        ...image,
        id,
        created_at: new Date().toISOString()
      };
      return mockUpdated;
    }
  };

  const removeImage = async (id: number) => {
    try {
      const success = await deleteImage(id);
      if (success) {
        // Clear cache to force refetch
        imageCache.clear();
        toast({
          title: 'Success',
          description: 'Image removed successfully from database',
        });
      }
      return success;
    } catch (error: any) {
      console.error('Error removing image:', error);
      
      const errorMsg = error.message?.includes('Supabase credentials') 
        ? 'Supabase is not configured. Removal is only from UI.'
        : 'Failed to remove image from database';
      
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
      
      // Return true to allow UI update even if database operation failed
      return true;
    }
  };

  const uploadImageFile = async (file: File) => {
    try {
      console.log('Starting upload process for file:', file.name, 'size:', file.size, 'type:', file.type);
      
      const url = await uploadImage(file);
      
      if (!url) {
        throw new Error('Failed to upload image to storage');
      }
      
      // Clear cache to force refetch
      imageCache.clear();
      
      console.log('File uploaded successfully, URL:', url);
      return url;
    } catch (uploadError: any) {
      console.error('Upload error:', uploadError);
      
      // Provide a more helpful message 
      const errorMsg = uploadError.message?.includes('Supabase credentials') 
        ? 'Supabase is not configured. Please set up your database connection.'
        : uploadError.message || 'Failed to upload to Supabase storage';
      
      toast({
        title: 'Upload Failed',
        description: errorMsg,
        variant: 'destructive',
      });
      
      // Generate a fake URL for demo purposes
      const fakeUrl = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?demo=true`;
      console.log('Using fallback demo URL:', fakeUrl);
      return fakeUrl;
    }
  };

  return {
    fetchImages,
    createImage,
    modifyImage: updateImage, 
    removeImage: deleteImage,
    uploadImageFile,
    cachedImages
  };
};
