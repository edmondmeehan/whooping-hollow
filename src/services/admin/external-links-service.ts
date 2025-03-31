
import { supabase } from '@/integrations/supabase/client';

export interface ExternalServiceLink {
  id?: string;
  name: string;
  url: string;
  description: string;
  property?: string;
}

export const fetchExternalServiceLinks = async (property?: string): Promise<ExternalServiceLink[]> => {
  let query = supabase
    .from('external_service_links')
    .select('*')
    .order('name');
  
  if (property) {
    query = query.eq('property', property);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching external service links:', error);
    throw new Error(error.message);
  }
  
  return data || [];
};

export const addExternalServiceLink = async (link: ExternalServiceLink): Promise<ExternalServiceLink> => {
  const { data, error } = await supabase
    .from('external_service_links')
    .insert(link)
    .select()
    .single();
  
  if (error) {
    console.error('Error adding external service link:', error);
    throw new Error(error.message);
  }
  
  return data;
};

export const updateExternalServiceLink = async (link: ExternalServiceLink): Promise<ExternalServiceLink> => {
  if (!link.id) throw new Error('Link ID is required for updates');
  
  const { data, error } = await supabase
    .from('external_service_links')
    .update({
      name: link.name,
      url: link.url,
      description: link.description,
      property: link.property,
      updated_at: new Date().toISOString()
    })
    .eq('id', link.id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating external service link:', error);
    throw new Error(error.message);
  }
  
  return data;
};

export const deleteExternalServiceLink = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('external_service_links')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting external service link:', error);
    throw new Error(error.message);
  }
};
