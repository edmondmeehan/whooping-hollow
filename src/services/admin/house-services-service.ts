
import { supabase } from '@/integrations/supabase/client';
import { 
  HouseService, 
  HouseServiceInput,
  HouseServiceCategory,
} from '@/types/service-types';

export const getHouseServices = async (property?: string): Promise<HouseService[]> => {
  try {
    let query = supabase
      .from('house_services_directory')
      .select('*');
      
    if (property) {
      query = query.eq('property', property);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching house services:', error);
      throw new Error(`Failed to fetch house services: ${error.message}`);
    }

    return data || [];
  } catch (err) {
    console.error('Error in getHouseServices:', err);
    throw err;
  }
};

export const getHouseServiceCategories = async (): Promise<HouseServiceCategory[]> => {
  // If you don't have a separate table for categories, this can be mocked or removed
  // This is just a placeholder - adjust based on your actual data structure
  return [
    { id: '1', name: 'Maintenance' },
    { id: '2', name: 'Cleaning' },
    { id: '3', name: 'Utilities' }
  ];
};

export const addHouseService = async (service: HouseServiceInput): Promise<HouseService> => {
  const { data, error } = await supabase
    .from('house_services_directory')
    .insert(service)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating house service:', error);
    throw new Error(`Failed to create house service: ${error.message}`);
  }

  return data;
};

export const updateHouseService = async (service: HouseService): Promise<HouseService> => {
  if (!service.id) throw new Error('Service ID is required for updates');
  
  const { data, error } = await supabase
    .from('house_services_directory')
    .update(service)
    .eq('id', service.id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating house service:', error);
    throw new Error(`Failed to update house service: ${error.message}`);
  }

  return data;
};

export const deleteHouseService = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('house_services_directory')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting house service:', error);
    throw new Error(`Failed to delete house service: ${error.message}`);
  }

  return true;
};
