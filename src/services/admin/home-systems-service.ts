
import { supabase } from '@/integrations/supabase/client';

export interface HomeSystem {
  id?: string;
  system: string;
  access: string | null;
  notes: string | null;
}

export const fetchHomeSystems = async (): Promise<HomeSystem[]> => {
  const { data, error } = await supabase
    .from('home_systems')
    .select('*')
    .order('system');
  
  if (error) {
    console.error('Error fetching home systems:', error);
    throw new Error(error.message);
  }
  
  return data || [];
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
  
  return data;
};

export const updateHomeSystem = async (system: HomeSystem): Promise<HomeSystem> => {
  if (!system.id) throw new Error('System ID is required for updates');
  
  const { data, error } = await supabase
    .from('home_systems')
    .update({
      system: system.system,
      access: system.access,
      notes: system.notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', system.id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating home system:', error);
    throw new Error(error.message);
  }
  
  return data;
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
