import { supabase } from '@/integrations/supabase/client';
import { AirbnbImage } from '@/types/image';

export const getImages = async (): Promise<AirbnbImage[]> => {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Supabase credentials are missing. Please check your environment variables.');
    }

    // Attempt to check connection by making a simple query
    try {
      await supabase.from('_postgrest_reserved_command').select('*').limit(1).throwOnError();
    } catch (connectionError: any) {
      console.error('Supabase connection test failed:', connectionError);
      throw new Error('Could not connect to Supabase database. Please check your connection.');
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

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `properties/${fileName}`;

    console.log('Uploading image to Supabase storage bucket: images, path:', filePath);

    // Upload the file to Supabase storage with the public policy we created
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image to storage:', uploadError);
      throw uploadError;
    }

    console.log('Upload successful, data:', uploadData);

    // Get the public URL
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    console.log('Image successfully uploaded, public URL:', data.publicUrl);
    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
};
