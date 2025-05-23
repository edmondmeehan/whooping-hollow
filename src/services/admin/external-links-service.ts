
import { supabase } from '@/integrations/supabase/client';
import { ExternalServiceLink, ExternalServiceLinkInput } from '@/types/service-types';

export const getExternalLinks = async (property?: string): Promise<ExternalServiceLink[]> => {
  let query = supabase
    .from('external_service_links')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (property) {
    query = query.eq('property', property);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching external links:', error);
    throw new Error(`Failed to fetch external links: ${error.message}`);
  }

  return data || [];
};

export const addExternalLink = async (link: ExternalServiceLinkInput): Promise<ExternalServiceLink> => {
  // Ensure description is included as it's required in the DB schema
  if (link.description === undefined) {
    link = { ...link, description: '' };
  }

  const { data, error } = await supabase
    .from('external_service_links')
    .insert(link)
    .select('*')
    .single();

  if (error) {
    console.error('Error creating external link:', error);
    throw new Error(`Failed to create external link: ${error.message}`);
  }

  return data;
};

export const updateExternalLink = async (link: ExternalServiceLink): Promise<ExternalServiceLink> => {
  if (!link.id) throw new Error('Link ID is required for updates');
  
  const { data, error } = await supabase
    .from('external_service_links')
    .update(link)
    .eq('id', link.id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating external link:', error);
    throw new Error(`Failed to update external link: ${error.message}`);
  }

  return data;
};

export const deleteExternalLink = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('external_service_links')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting external link:', error);
    throw new Error(`Failed to delete external link: ${error.message}`);
  }

  return true;
};
