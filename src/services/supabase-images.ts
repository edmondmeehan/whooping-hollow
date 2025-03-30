
import { supabase } from '@/integrations/supabase/client';
import { AirbnbImage } from '@/types/image';

export const getImages = async (): Promise<AirbnbImage[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      throw new Error('Supabase credentials are missing. Please check your environment variables.');
    }

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
    throw error;
  }
};

export const addImage = async (image: AirbnbImage): Promise<AirbnbImage | null> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      throw new Error('Supabase credentials are missing. Please check your environment variables.');
    }

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
    throw error;
  }
};

export const updateImage = async (id: number, image: AirbnbImage): Promise<AirbnbImage | null> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      throw new Error('Supabase credentials are missing. Please check your environment variables.');
    }

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

export const deleteImage = async (id: number): Promise<boolean> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      throw new Error('Supabase credentials are missing. Please check your environment variables.');
    }

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

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      throw new Error('Supabase credentials are missing. Please check your environment variables.');
    }

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
    throw error;
  }
};
