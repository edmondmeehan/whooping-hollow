
import { supabase } from '@/integrations/supabase/client';
import { validateSupabaseConnection } from './base-service';

/**
 * Uploads an image file to Supabase storage
 * @param file The file to upload
 * @returns The public URL of the uploaded image
 */
export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    validateSupabaseConnection();

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;  // Simplified path without subfolder

    console.log('Uploading image to Supabase storage bucket: images, path:', filePath);

    // First, explicitly check if the bucket exists and try to create it if it doesn't
    try {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error checking storage buckets:', bucketsError);
        throw new Error('Could not access Supabase storage. Please check your Supabase setup and permissions.');
      }
      
      console.log('Available buckets:', buckets?.map(b => b.name).join(', ') || 'none');
      
      const imagesBucketExists = buckets?.some(bucket => bucket.name === 'images');
      
      if (!imagesBucketExists) {
        console.error('The "images" storage bucket does not exist in Supabase');
        throw new Error('The "images" storage bucket does not exist in Supabase. Please verify it was created successfully in your SQL migration.');
      }
      
      console.log('Images bucket exists, proceeding with upload');
    } catch (bucketError: any) {
      console.error('Error checking for images bucket:', bucketError);
      throw bucketError;
    }

    // Upload the file to Supabase storage
    console.log('Attempting to upload file to bucket "images"');
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image to storage:', uploadError);
      console.error('Error message:', uploadError.message);
      
      // Provide more specific error messages based on error type
      if (uploadError.message.includes('No such bucket') || uploadError.message.includes('not found')) {
        throw new Error('The "images" storage bucket could not be found. Please verify it was created correctly in Supabase.');
      }
      
      if (uploadError.message.includes('permission') || uploadError.message.includes('access')) {
        throw new Error('Permission denied: Check your storage bucket policies in Supabase.');
      }
      
      throw uploadError;
    }

    console.log('Upload successful, data:', uploadData);

    // Get the public URL
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    console.log('Image successfully uploaded, public URL:', data.publicUrl);
    return data.publicUrl;
  } catch (error: any) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
};
