
import { AirbnbImage } from '@/types/image';
import { addImage, updateImage, deleteImage } from '@/services/supabase-images';
import { useToast } from '@/hooks/use-toast';
import { imageCache } from './image-cache';

export const useImageCrudService = () => {
  const { toast } = useToast();

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

  return {
    createImage,
    modifyImage,
    removeImage
  };
};
