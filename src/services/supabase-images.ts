
import { createClient } from '@supabase/supabase-js';
import { AirbnbImage } from '@/types/image';

// Initialize Supabase client
// Check for environment variables or use default test values if in development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that we have the required credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
  // Throw a more descriptive error during initialization
  throw new Error('Supabase credentials are missing. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const getImages = async (): Promise<AirbnbImage[]> => {
  try {
    const { data, error } = await supabase
      .from('property_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
      throw error;
    }

    return data as AirbnbImage[];
  } catch (error) {
    console.error('Error in getImages:', error);
    return [];
  }
};

export const addImage = async (image: AirbnbImage): Promise<AirbnbImage | null> => {
  try {
    const { data, error } = await supabase
      .from('property_images')
      .insert([{ url: image.url, alt: image.alt }])
      .select()
      .single();

    if (error) {
      console.error('Error adding image:', error);
      throw error;
    }

    return data as AirbnbImage;
  } catch (error) {
    console.error('Error in addImage:', error);
    return null;
  }
};

export const updateImage = async (id: number, image: AirbnbImage): Promise<AirbnbImage | null> => {
  try {
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
    return null;
  }
};

export const deleteImage = async (id: number): Promise<boolean> => {
  try {
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
    return false;
  }
};

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `properties/${fileName}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
};
