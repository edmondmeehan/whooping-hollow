
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
    let query = supabase
      .from('house_services_directory')
      .select('*');
    
    if (property) {
      query = query.eq('property', property);
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
      .from('house_services_directory')
      .insert({
        service: service.service,
        company: service.company,
        status: service.status,
        contact_name: service.contact_name || '',
        phone: service.phone || '',
        email: service.email || '',
        notes: service.notes || '',
        website: service.website || '',
        property: service.property
      })
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
  if (!service.id) return null;
  
  try {
    const { data, error } = await supabase
      .from('house_services_directory')
      .update({
        service: service.service,
        company: service.company,
        status: service.status,
        contact_name: service.contact_name || '',
        phone: service.phone || '',
        email: service.email || '',
        notes: service.notes || '',
        website: service.website || '',
        property: service.property
      })
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
      .from('house_services_directory')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting house service:', error);
    return false;
  }
};
