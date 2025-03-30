
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  simulateCloudinaryUpload, 
  extractAltTextFromFileName,
  isCloudinaryConfigured,
  getCloudinaryUrl
} from './cloudinary/cloudinary-upload-utils';

interface UseCloudinaryUploadOptions {
  onSuccess?: (url: string, alt: string) => void;
}

export const useCloudinaryUpload = ({ onSuccess }: UseCloudinaryUploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const cloudinaryUrl = getCloudinaryUrl();

  const uploadToCloudinary = async (file: File): Promise<string> => {
    return simulateCloudinaryUpload(file, setUploadProgress);
  };

  const handleUpload = async (file: File) => {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      showConfigurationError();
      return null;
    }

    try {
      // Start upload process
      setIsUploading(true);
      setUploadProgress(0);
      
      // Upload the file
      const imageUrl = await uploadToCloudinary(file);
      const imageAlt = extractAltTextFromFileName(file.name);
      
      // Handle successful upload
      handleUploadSuccess(imageUrl, imageAlt);
      
      return { imageUrl, imageAlt };
      
    } catch (error) {
      // Handle upload error
      handleUploadError(error);
      return null;
    } finally {
      // Reset upload state
      resetUploadState();
    }
  };

  const showConfigurationError = () => {
    toast({
      title: 'Cloudinary not configured',
      description: 'Please configure your Cloudinary URL in the API Keys section first',
      variant: 'destructive',
    });
  };

  const handleUploadSuccess = (imageUrl: string, imageAlt: string) => {
    if (onSuccess) {
      onSuccess(imageUrl, imageAlt);
    }
    
    toast({
      title: 'Upload successful',
      description: 'Your image has been uploaded to Cloudinary',
    });
  };

  const handleUploadError = (error: any) => {
    console.error('Error uploading to Cloudinary:', error);
    toast({
      title: 'Upload failed',
      description: 'There was a problem uploading your image to Cloudinary',
      variant: 'destructive',
    });
  };

  const resetUploadState = () => {
    setIsUploading(false);
    setUploadProgress(0);
  };

  return {
    isUploading,
    uploadProgress,
    cloudinaryUrl,
    handleUpload
  };
};
