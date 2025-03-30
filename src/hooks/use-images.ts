import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchAirbnbImages } from '@/utils/airbnbScraper';
import { AirbnbImage } from '@/types/image';

export const useImages = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [multipleUrls, setMultipleUrls] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const fetchedImages = await fetchAirbnbImages('1314531825053234635');
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error loading images:', error);
        toast({
          title: 'Error',
          description: 'Failed to load images',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [toast]);

  const handleAddImage = () => {
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

    setImages([...images, newImage]);
    setNewImageUrl('');
    setNewImageAlt('');

    toast({
      title: 'Success',
      description: 'Image added successfully',
    });
  };

  const handleAddUploadedImage = (url: string, alt: string) => {
    const newImage: AirbnbImage = {
      url,
      alt,
    };

    setImages([...images, newImage]);

    toast({
      title: 'Success',
      description: 'Uploaded image added to gallery',
    });
  };

  const handleAddMultipleImages = () => {
    if (!multipleUrls.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter at least one URL',
        variant: 'destructive',
      });
      return;
    }

    // Split input by newlines and filter out empty lines
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

    // Create new image objects
    const newImages = urlList.map((url, index) => ({
      url,
      alt: `Property Image ${images.length + index + 1}`
    }));

    setImages([...images, ...newImages]);
    setMultipleUrls('');

    toast({
      title: 'Success',
      description: `Added ${newImages.length} images successfully`,
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    toast({
      title: 'Success',
      description: 'Image removed successfully',
    });
  };

  const handleEditImage = (index: number) => {
    setEditingIndex(index);
    setNewImageUrl(images[index].url);
    setNewImageAlt(images[index].alt);
  };

  const handleUpdateImage = () => {
    if (editingIndex === null) return;
    
    const updatedImages = [...images];
    updatedImages[editingIndex] = {
      url: newImageUrl,
      alt: newImageAlt,
    };
    
    setImages(updatedImages);
    setNewImageUrl('');
    setNewImageAlt('');
    setEditingIndex(null);
    
    toast({
      title: 'Success',
      description: 'Image updated successfully',
    });
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
    handleAddUploadedImage
  };
};
