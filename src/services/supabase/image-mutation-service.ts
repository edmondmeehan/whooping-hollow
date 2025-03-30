
import { supabase } from '@/integrations/supabase/client';
import { AirbnbImage } from '@/types/image';
import { validateSupabaseConnection } from './base-service';

/**
 * Adds a new image to Supabase
 * @param image The image to add
 * @returns The added image
 */
export const addImage = async (image: AirbnbImage): Promise<AirbnbImage | null> => {
  try {
    validateSupabaseConnection();

    console.log('Adding image to Supabase:', image);
    const { data, error } = await supabase
      .from('property_images')
      .insert([{ url: image.url, alt: image.alt }])
      .select()
      .single();

    if (error) {
      console.error('Error adding image:', error);
      throw error;
    }

    console.log('Image added successfully:', data);
    return data as AirbnbImage;
  } catch (error: any) {
    console.error('Error in addImage:', error);
    throw error;
  }
};

/**
 * Updates an existing image in Supabase
 * @param id The ID of the image to update
 * @param image The updated image data
 * @returns The updated image
 */
export const updateImage = async (id: number, image: AirbnbImage): Promise<AirbnbImage | null> => {
  try {
    validateSupabaseConnection();

    const { data, error } = await supabase
      .from('property_images')
      .update({ url: image.url, alt: image.alt })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating image:', error);
      throw error;
    }

    return data as AirbnbImage;
  } catch (error) {
    console.error('Error in updateImage:', error);
    throw error;
  }
};

/**
 * Deletes an image from Supabase
 * @param id The ID of the image to delete
 * @returns True if deletion was successful
 */
export const deleteImage = async (id: number): Promise<boolean> => {
  try {
    validateSupabaseConnection();

    const { error } = await supabase
      .from('property_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting image:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw error;
  }
};
