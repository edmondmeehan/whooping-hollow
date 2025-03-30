
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AirbnbImage } from '@/types/image';
import { getImages, addImage, updateImage, deleteImage, uploadImage } from '@/services/supabase-images';

export const useImages = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [multipleUrls, setMultipleUrls] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedImages = await getImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: 'Error',
        description: 'Failed to load images from database',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleAddImage = async () => {
    if (!newImageUrl || !newImageAlt) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both URL and description',
        variant: 'destructive',
      });
      return;
    }

    const newImage: AirbnbImage = {
      url: newImageUrl,
      alt: newImageAlt,
    };

    try {
      setLoading(true);
      const addedImage = await addImage(newImage);
      
      if (addedImage) {
        setImages([addedImage, ...images]);
        setNewImageUrl('');
        setNewImageAlt('');
        
        toast({
          title: 'Success',
          description: 'Image added successfully to database',
        });
      }
    } catch (error) {
      console.error('Error adding image:', error);
      toast({
        title: 'Error',
        description: 'Failed to add image to database',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUploadedImage = async (file: File, alt: string) => {
    try {
      setLoading(true);
      console.log('Starting upload process for file:', file.name, 'size:', file.size, 'type:', file.type);
      
      let url: string | null;
      try {
        url = await uploadImage(file);
        
        if (!url) {
          throw new Error('Failed to upload image to storage');
        }
        
        console.log('File uploaded successfully, URL:', url);
      } catch (uploadError: any) {
        console.error('Upload error:', uploadError);
        toast({
          title: 'Upload Failed',
          description: uploadError.message || 'Failed to upload to Supabase storage',
          variant: 'destructive',
        });
        throw uploadError;
      }
      
      const newImage: AirbnbImage = {
        url,
        alt: alt || file.name,
      };
      
      console.log('Adding image to database:', newImage);
      const addedImage = await addImage(newImage);
      
      if (addedImage) {
        setImages([addedImage, ...images]);
        
        toast({
          title: 'Success',
          description: 'Image uploaded and saved to database',
        });
      }
    } catch (error: any) {
      console.error('Error in handleAddUploadedImage:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMultipleImages = async () => {
    if (!multipleUrls.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter at least one URL',
        variant: 'destructive',
      });
      return;
    }

    const urlList = multipleUrls.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (urlList.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'No valid URLs found',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const newImages = [];
      
      for (const url of urlList) {
        const newImage: AirbnbImage = {
          url,
          alt: `Property Image ${new Date().toISOString()}`
        };
        
        const addedImage = await addImage(newImage);
        if (addedImage) {
          newImages.push(addedImage);
        }
      }
      
      if (newImages.length > 0) {
        setImages([...newImages, ...images]);
        setMultipleUrls('');
        
        toast({
          title: 'Success',
          description: `Added ${newImages.length} images successfully to database`,
        });
      }
    } catch (error) {
      console.error('Error adding multiple images:', error);
      toast({
        title: 'Error',
        description: 'Failed to add images to database',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
      const success = await deleteImage(imageToDelete.id);
      
      if (success) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        
        toast({
          title: 'Success',
          description: 'Image removed successfully from database',
        });
      }
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove image from database',
        variant: 'destructive',
      });
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
      const updatedImage = await updateImage(imageToUpdate.id, {
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
        
        toast({
          title: 'Success',
          description: 'Image updated successfully in database',
        });
      }
    } catch (error) {
      console.error('Error updating image:', error);
      toast({
        title: 'Error',
        description: 'Failed to update image in database',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshImages = () => {
    loadImages();
  };

  return {
    images,
    loading,
    newImageUrl,
    newImageAlt,
    multipleUrls,
    editingIndex,
    setNewImageUrl,
    setNewImageAlt,
    setMultipleUrls,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleEditImage,
    handleUpdateImage,
    handleAddUploadedImage,
    refreshImages
  };
};
