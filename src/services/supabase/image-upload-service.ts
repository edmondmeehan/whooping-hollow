
import { supabase } from '@/integrations/supabase/client';
import { AirbnbImage } from '@/types/image';
import { v4 as uuidv4 } from 'uuid';
import { validateSupabaseConnection } from './base-service';

/**
 * Uploads an image file to Supabase Storage and returns the URL
 * @param file File to upload
 * @param altText Alternative text for the image
 * @returns The uploaded image data
 */
export const uploadImage = async (file: File, altText: string): Promise<AirbnbImage> => {
  try {
    validateSupabaseConnection();
    
    console.log('Uploading image to Supabase Storage...');
    
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `public/${fileName}`;
    
    // Upload the file to the 'images' bucket
    const { error: uploadError, data } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        upsert: false,
        contentType: file.type
      });
    
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      
      // Check if the bucket exists
      if (uploadError.message?.includes('bucket') && uploadError.message?.includes('not found')) {
        throw new Error('Storage bucket "images" does not exist. Please ensure it is created in Supabase.');
      }
      
      throw uploadError;
    }
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    
    console.log('Image uploaded successfully. Public URL:', publicUrl);
    
    // Return the image data
    return {
      url: publicUrl,
      alt: altText,
      created_at: new Date().toISOString()
    };
  } catch (error: any) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
};
