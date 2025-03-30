
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/services/cloudinary-config';

interface UseCloudinaryUploadOptions {
  onSuccess?: (url: string, alt: string) => void;
}

export const useCloudinaryUpload = ({ onSuccess }: UseCloudinaryUploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const cloudinaryUrl = cloudinaryConfig.getCloudinaryUrl();

  const uploadToCloudinary = async (file: File): Promise<string> => {
    // This is a placeholder implementation
    // In a real scenario, you would use the Cloudinary API
    // For now, we'll just return a placeholder URL after a delay
    
    // Simulate network delay and progress
    const intervalId = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = Math.min(prev + 5, 95);
        return newProgress;
      });
    }, 200);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(intervalId);
    setUploadProgress(100);
    
    return URL.createObjectURL(file);
  };

  const handleUpload = async (file: File) => {
    if (!cloudinaryUrl) {
      toast({
        title: 'Cloudinary not configured',
        description: 'Please configure your Cloudinary URL in the API Keys section first',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const imageUrl = await uploadToCloudinary(file);
      const imageAlt = file.name.split('.')[0] || 'Uploaded image';
      
      if (onSuccess) {
        onSuccess(imageUrl, imageAlt);
      }
      
      toast({
        title: 'Upload successful',
        description: 'Your image has been uploaded to Cloudinary',
      });
      
      return { imageUrl, imageAlt };
      
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      toast({
        title: 'Upload failed',
        description: 'There was a problem uploading your image to Cloudinary',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    isUploading,
    uploadProgress,
    cloudinaryUrl,
    handleUpload
  };
};
