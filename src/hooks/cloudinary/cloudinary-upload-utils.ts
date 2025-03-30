
import { cloudinaryConfig } from '@/services/cloudinary-config';

/**
 * A utility function to simulate uploading a file to Cloudinary with progress tracking
 * In a real implementation, this would use the Cloudinary API
 */
export const simulateCloudinaryUpload = async (
  file: File, 
  onProgress: (progress: number) => void
): Promise<string> => {
  // Simulate network delay and progress
  const intervalId = setInterval(() => {
    onProgress(prev => {
      const newProgress = Math.min(prev + 5, 95);
      return newProgress;
    });
  }, 200);
  
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  clearInterval(intervalId);
  onProgress(100);
  
  // Return a local object URL instead of a real Cloudinary URL
  // In a real implementation, this would be the URL returned by Cloudinary
  return URL.createObjectURL(file);
};

/**
 * Extracts an alt text from a file name by removing the extension
 */
export const extractAltTextFromFileName = (fileName: string): string => {
  return fileName.split('.')[0] || 'Uploaded image';
};

/**
 * Checks if Cloudinary is properly configured
 */
export const isCloudinaryConfigured = (): boolean => {
  const cloudinaryUrl = cloudinaryConfig.getCloudinaryUrl();
  return !!cloudinaryUrl;
};

/**
 * Get the Cloudinary URL from configuration
 */
export const getCloudinaryUrl = (): string | null => {
  return cloudinaryConfig.getCloudinaryUrl();
};
