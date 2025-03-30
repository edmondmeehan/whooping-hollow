
import { AirbnbImage } from '@/types/image';
import { getImages, addImage, updateImage, deleteImage, uploadImage } from '@/services/supabase-images';
import { useToast } from '@/hooks/use-toast';

export const useImageService = () => {
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      const fetchedImages = await getImages();
      return fetchedImages;
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: 'Error',
        description: 'Failed to load images from database',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const createImage = async (newImage: AirbnbImage) => {
    try {
      const addedImage = await addImage(newImage);
      if (addedImage) {
        toast({
          title: 'Success',
          description: 'Image added successfully to database',
        });
      }
      return addedImage;
    } catch (error) {
      console.error('Error adding image:', error);
      toast({
        title: 'Error',
        description: 'Failed to add image to database',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const modifyImage = async (id: number, image: AirbnbImage) => {
    try {
      const updatedImage = await updateImage(id, image);
      if (updatedImage) {
        toast({
          title: 'Success',
          description: 'Image updated successfully in database',
        });
      }
      return updatedImage;
    } catch (error) {
      console.error('Error updating image:', error);
      toast({
        title: 'Error',
        description: 'Failed to update image in database',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const removeImage = async (id: number) => {
    try {
      const success = await deleteImage(id);
      if (success) {
        toast({
          title: 'Success',
          description: 'Image removed successfully from database',
        });
      }
      return success;
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove image from database',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const uploadImageFile = async (file: File) => {
    try {
      console.log('Starting upload process for file:', file.name, 'size:', file.size, 'type:', file.type);
      
      const url = await uploadImage(file);
      
      if (!url) {
        throw new Error('Failed to upload image to storage');
      }
      
      console.log('File uploaded successfully, URL:', url);
      return url;
    } catch (uploadError: any) {
      console.error('Upload error:', uploadError);
      toast({
        title: 'Upload Failed',
        description: uploadError.message || 'Failed to upload to Supabase storage',
        variant: 'destructive',
      });
      throw uploadError;
    }
  };

  return {
    fetchImages,
    createImage,
    modifyImage, 
    removeImage,
    uploadImageFile
  };
};
