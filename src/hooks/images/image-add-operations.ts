
import { useState } from 'react';
import { AirbnbImage } from '@/types/image';
import { useImageService } from './image-service';
import { useToast } from '@/hooks/use-toast';

export const useImageAddOperations = (images: AirbnbImage[], setImages: React.Dispatch<React.SetStateAction<AirbnbImage[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [multipleUrls, setMultipleUrls] = useState('');
  const { createImage, uploadImageFile } = useImageService();
  const { toast } = useToast();

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
      const addedImage = await createImage(newImage);
      
      if (addedImage) {
        setImages([addedImage, ...images]);
        setNewImageUrl('');
        setNewImageAlt('');
      }
    } catch (error) {
      console.error('Error in handleAddImage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUploadedImage = async (file: File, alt: string) => {
    try {
      setLoading(true);
      const url = await uploadImageFile(file);
      
      const newImage: AirbnbImage = {
        url,
        alt: alt || file.name,
      };
      
      console.log('Adding image to database:', newImage);
      const addedImage = await createImage(newImage);
      
      if (addedImage) {
        setImages([addedImage, ...images]);
      }
    } catch (error: any) {
      console.error('Error in handleAddUploadedImage:', error);
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
        
        const addedImage = await createImage(newImage);
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
    } finally {
      setLoading(false);
    }
  };

  return {
    newImageUrl,
    newImageAlt,
    multipleUrls,
    setNewImageUrl,
    setNewImageAlt,
    setMultipleUrls,
    handleAddImage,
    handleAddUploadedImage,
    handleAddMultipleImages
  };
};
