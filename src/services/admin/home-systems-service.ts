
import { supabase } from '@/integrations/supabase/client';
import { HomeSystem, HomeSystemInput } from '@/hooks/admin/use-home-systems';
import { BaseService } from '../supabase/base-service';

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

  public async getHomeSystems(): Promise<HomeSystem[]> {
    const { data, error } = await supabase
      .from('home_systems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching home systems:', error);
      throw new Error(`Failed to fetch home systems: ${error.message}`);
    }

    return data || [];
  }

  public async createHomeSystem(system: HomeSystemInput): Promise<HomeSystem> {
    const { data, error } = await supabase
      .from('home_systems')
      .insert([system])
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

  public async deleteHomeSystem(id: string): Promise<void> {
    const { error } = await supabase
      .from('home_systems')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting home system:', error);
      throw new Error(`Failed to delete home system: ${error.message}`);
    }
  }
}
