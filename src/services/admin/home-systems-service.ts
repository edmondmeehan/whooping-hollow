
import { supabase } from '@/integrations/supabase/client';
import { HomeSystem, HomeSystemInput, BaseService } from '@/types/service-types';

export class HomeSystemsService extends BaseService {
  private static instance: HomeSystemsService;

  private constructor() {
    super();
  }

  public static getInstance(): HomeSystemsService {
    if (!HomeSystemsService.instance) {
      HomeSystemsService.instance = new HomeSystemsService();
    }
    return HomeSystemsService.instance;
  }

  public async getHomeSystems(property?: string): Promise<HomeSystem[]> {
    let query = supabase
      .from('home_systems')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (property) {
      query = query.eq('property', property);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching home systems:', error);
      throw new Error(`Failed to fetch home systems: ${error.message}`);
    }

    return data || [];
  }

  public async createHomeSystem(system: HomeSystemInput): Promise<HomeSystem> {
    const { data, error } = await supabase
      .from('home_systems')
      .insert(system)
      .select('*')
      .single();

    if (error) {
      console.error('Error creating home system:', error);
      throw new Error(`Failed to create home system: ${error.message}`);
    }

    return data;
  }

  public async updateHomeSystem(id: string, system: Partial<HomeSystemInput>): Promise<HomeSystem> {
    const { data, error } = await supabase
      .from('home_systems')
      .update(system)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating home system:', error);
      throw new Error(`Failed to update home system: ${error.message}`);
    }

    return data;
  }

  public async deleteHomeSystem(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('home_systems')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting home system:', error);
      throw new Error(`Failed to delete home system: ${error.message}`);
    }

    return true;
  }
}

// Export service functions for easier usage
export const getHomeSystems = async (property?: string): Promise<HomeSystem[]> => {
  return HomeSystemsService.getInstance().getHomeSystems(property);
};

export const addHomeSystem = async (system: HomeSystemInput): Promise<HomeSystem> => {
  return HomeSystemsService.getInstance().createHomeSystem(system);
};

export const updateHomeSystem = async (system: HomeSystem): Promise<HomeSystem> => {
  if (!system.id) throw new Error('System ID is required for updates');
  return HomeSystemsService.getInstance().updateHomeSystem(system.id, system);
};

export const deleteHomeSystem = async (id: string): Promise<boolean> => {
  return HomeSystemsService.getInstance().deleteHomeSystem(id);
};
