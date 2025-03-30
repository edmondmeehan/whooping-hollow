
import { uploadImage } from '@/services/supabase-images';
import { useToast } from '@/hooks/use-toast';

export const useImageUploadService = () => {
  const { toast } = useToast();
  
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

  return { uploadImageFile };
};
