
import { supabase } from '@/integrations/supabase/client';

export interface ExternalServiceLink {
  id?: string;
  name: string;
  url: string;
  description?: string;
  property?: string;
}

export const getExternalLinks = async (property?: string): Promise<ExternalServiceLink[]> => {
  try {
    let query = supabase
      .from('external_service_links')
      .select('*');
    
    if (property) {
      query = query.eq('property', property);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting external links:', error);
    return [];
  }
};

export const addExternalLink = async (link: ExternalServiceLink): Promise<ExternalServiceLink | null> => {
  try {
    const { data, error } = await supabase
      .from('external_service_links')
      .insert({
        name: link.name,
        url: link.url,
        description: link.description || '',
        property: link.property
      })
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding external link:', error);
    return null;
  }
};

export const updateExternalLink = async (link: ExternalServiceLink): Promise<ExternalServiceLink | null> => {
  if (!link.id) return null;
  
  try {
    const { data, error } = await supabase
      .from('external_service_links')
      .update({
        name: link.name,
        url: link.url,
        description: link.description || '',
        property: link.property
      })
      .eq('id', link.id)
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating external link:', error);
    return null;
  }
};

export const deleteExternalLink = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('external_service_links')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting external link:', error);
    return false;
  }
};
