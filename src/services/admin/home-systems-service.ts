
import { supabase } from '@/integrations/supabase/client';

export interface HomeSystem {
  id?: string;
  system: string;
  access?: string;
  notes?: string;
  property?: string;
}

export const getHomeSystems = async (property?: string): Promise<HomeSystem[]> => {
  try {
    const query = supabase
      .from('home_systems')
      .select('*');
    
    if (property) {
      query.eq('property', property);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting home systems:', error);
    return [];
  }
};

export const addHomeSystem = async (system: HomeSystem): Promise<HomeSystem | null> => {
  try {
    const { data, error } = await supabase
      .from('home_systems')
      .insert(system)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding home system:', error);
    return null;
  }
};

export const updateHomeSystem = async (system: HomeSystem): Promise<HomeSystem | null> => {
  try {
    const { data, error } = await supabase
      .from('home_systems')
      .update(system)
      .eq('id', system.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating home system:', error);
    return null;
  }
};

export const deleteHomeSystem = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('home_systems')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting home system:', error);
    return false;
  }
};
