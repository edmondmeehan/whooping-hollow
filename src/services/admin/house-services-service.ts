
import { supabase } from '@/integrations/supabase/client';

export interface HouseService {
  id?: string;
  service: string;
  company: string;
  status: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  website?: string;
  property?: string;
}

export const getHouseServices = async (property?: string): Promise<HouseService[]> => {
  try {
    const query = supabase
      .from('house_services')
      .select('*');
    
    if (property) {
      query.eq('property', property);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting house services:', error);
    return [];
  }
};

export const addHouseService = async (service: HouseService): Promise<HouseService | null> => {
  try {
    const { data, error } = await supabase
      .from('house_services')
      .insert(service)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding house service:', error);
    return null;
  }
};

export const updateHouseService = async (service: HouseService): Promise<HouseService | null> => {
  try {
    const { data, error } = await supabase
      .from('house_services')
      .update(service)
      .eq('id', service.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating house service:', error);
    return null;
  }
};

export const deleteHouseService = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('house_services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting house service:', error);
    return false;
  }
};
