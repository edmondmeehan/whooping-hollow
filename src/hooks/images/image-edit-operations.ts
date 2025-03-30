
import { useState } from 'react';
import { AirbnbImage } from '@/types/image';
import { useImageService } from './image-service';
import { useToast } from '@/hooks/use-toast';

export const useImageEditOperations = (images: AirbnbImage[], setImages: React.Dispatch<React.SetStateAction<AirbnbImage[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const { modifyImage, removeImage } = useImageService();
  const { toast } = useToast();

  const handleRemoveImage = async (index: number) => {
    const imageToDelete = images[index];
    if (!imageToDelete.id) {
      toast({
        title: 'Error',
        description: 'Cannot delete image without ID',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const success = await removeImage(imageToDelete.id);
      
      if (success) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
      }
    } catch (error) {
      console.error('Error in handleRemoveImage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditImage = (index: number) => {
    setEditingIndex(index);
    setNewImageUrl(images[index].url);
    setNewImageAlt(images[index].alt);
  };

  const handleUpdateImage = async () => {
    if (editingIndex === null) return;
    
    const imageToUpdate = images[editingIndex];
    if (!imageToUpdate.id) {
      toast({
        title: 'Error',
        description: 'Cannot update image without ID',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const updatedImage = await modifyImage(imageToUpdate.id, {
        url: newImageUrl,
        alt: newImageAlt,
      });
      
      if (updatedImage) {
        const updatedImages = [...images];
        updatedImages[editingIndex] = updatedImage;
        setImages(updatedImages);
        setNewImageUrl('');
        setNewImageAlt('');
        setEditingIndex(null);
      }
    } catch (error) {
      console.error('Error in handleUpdateImage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInlineUpdateImage = async (index: number, updatedImage: AirbnbImage) => {
    const imageToUpdate = images[index];
    
    if (!imageToUpdate.id) {
      toast({
        title: 'Error',
        description: 'Cannot update image without ID',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      const result = await modifyImage(imageToUpdate.id, {
        url: updatedImage.url,
        alt: updatedImage.alt,
      });
      
      if (result) {
        const updatedImages = [...images];
        updatedImages[index] = result;
        setImages(updatedImages);
      }
    } catch (error) {
      console.error('Error in handleInlineUpdateImage:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    editingIndex,
    newImageUrl,
    newImageAlt,
    setNewImageUrl,
    setNewImageAlt,
    handleEditImage,
    handleUpdateImage,
    handleRemoveImage,
    handleInlineUpdateImage
  };
};
