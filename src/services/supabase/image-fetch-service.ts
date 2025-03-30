
import { supabase } from '@/integrations/supabase/client';
import { AirbnbImage } from '@/types/image';
import { validateSupabaseConnection, testSupabaseConnection } from './base-service';

/**
 * Fetches all images from Supabase
 * @returns Array of AirbnbImages
 */
export const getImages = async (): Promise<AirbnbImage[]> => {
  try {
    // Validate Supabase configuration
    validateSupabaseConnection();

    // Test connection to the property_images table
    await testSupabaseConnection("property_images");

    console.log('Connection to Supabase successful, fetching images...');
    const { data, error } = await supabase
      .from('property_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No images found in database');
      return [];
    }

    console.log('Successfully fetched images:', data.length, 'images found');
    return data as AirbnbImage[];
  } catch (error: any) {
    console.error('Error in getImages:', error);
    throw error;
  }
};
