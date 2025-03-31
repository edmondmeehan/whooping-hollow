
import { supabase } from '@/integrations/supabase/client';

export interface HomeSystem {
  id?: string;
  system: string;
  access: string | null;
  notes: string | null;
  property?: string;
}

export const fetchHomeSystems = async (property?: string): Promise<HomeSystem[]> => {
  let query = supabase
    .from('home_systems')
    .select('*')
    .order('system');
  
  if (property) {
    query = query.eq('property', property);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching home systems:', error);
    throw new Error(error.message);
  }
  
  return data as HomeSystem[] || [];
};

export const addHomeSystem = async (system: HomeSystem): Promise<HomeSystem> => {
  const { data, error } = await supabase
    .from('home_systems')
    .insert(system)
    .select()
    .single();
  
  if (error) {
    console.error('Error adding home system:', error);
    throw new Error(error.message);
  }
  
  return data as HomeSystem;
};

export const updateHomeSystem = async (system: HomeSystem): Promise<HomeSystem> => {
  if (!system.id) throw new Error('System ID is required for updates');
  
  const { data, error } = await supabase
    .from('home_systems')
    .update({
      system: system.system,
      access: system.access,
      notes: system.notes,
      property: system.property,
      updated_at: new Date().toISOString()
    })
    .eq('id', system.id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating home system:', error);
    throw new Error(error.message);
  }
  
  return data as HomeSystem;
};

export const deleteHomeSystem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('home_systems')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting home system:', error);
    throw new Error(error.message);
  }
};
