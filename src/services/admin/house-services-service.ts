
import { supabase } from '@/integrations/supabase/client';

export interface HouseService {
  id?: string;
  service: string;
  company: string;
  status: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  website?: string | null;
}

export const fetchHouseServices = async (): Promise<HouseService[]> => {
  const { data, error } = await supabase
    .from('house_services_directory')
    .select('*')
    .order('service');
  
  if (error) {
    console.error('Error fetching house services:', error);
    throw new Error(error.message);
  }
  
  return data as HouseService[] || [];
};

export const addHouseService = async (service: HouseService): Promise<HouseService> => {
  const { data, error } = await supabase
    .from('house_services_directory')
    .insert(service)
    .select()
    .single();
  
  if (error) {
    console.error('Error adding house service:', error);
    throw new Error(error.message);
  }
  
  return data as HouseService;
};

export const updateHouseService = async (service: HouseService): Promise<HouseService> => {
  if (!service.id) throw new Error('Service ID is required for updates');
  
  const { data, error } = await supabase
    .from('house_services_directory')
    .update({
      service: service.service,
      company: service.company,
      status: service.status,
      contact_name: service.contact_name,
      phone: service.phone,
      email: service.email,
      notes: service.notes,
      website: service.website,
      updated_at: new Date().toISOString()
    })
    .eq('id', service.id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating house service:', error);
    throw new Error(error.message);
  }
  
  return data as HouseService;
};

export const deleteHouseService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('house_services_directory')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting house service:', error);
    throw new Error(error.message);
  }
};
