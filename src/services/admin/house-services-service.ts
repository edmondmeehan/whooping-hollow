
import { supabase } from '@/integrations/supabase/client';
import { 
  HouseService, 
  HouseServiceInput, 
  HouseServiceCategory 
} from '@/hooks/admin/use-house-services';
import { BaseService } from '../supabase/base-service';

export class HouseServicesService extends BaseService {
  private static instance: HouseServicesService;

  private constructor() {
    super();
  }

  public static getInstance(): HouseServicesService {
    if (!HouseServicesService.instance) {
      HouseServicesService.instance = new HouseServicesService();
    }
    return HouseServicesService.instance;
  }

  public async getHouseServices(): Promise<HouseService[]> {
    const { data, error } = await supabase
      .from('house_services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching house services:', error);
      throw new Error(`Failed to fetch house services: ${error.message}`);
    }

    return data || [];
  }

  public async getHouseServiceCategories(): Promise<HouseServiceCategory[]> {
    const { data, error } = await supabase
      .from('house_service_categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching house service categories:', error);
      throw new Error(`Failed to fetch house service categories: ${error.message}`);
    }

    return data || [];
  }

  public async createHouseService(service: HouseServiceInput): Promise<HouseService> {
    const { data, error } = await supabase
      .from('house_services')
      .insert([service])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating house service:', error);
      throw new Error(`Failed to create house service: ${error.message}`);
    }

    return data;
  }

  public async updateHouseService(id: string, service: Partial<HouseServiceInput>): Promise<HouseService> {
    const { data, error } = await supabase
      .from('house_services')
      .update(service)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating house service:', error);
      throw new Error(`Failed to update house service: ${error.message}`);
    }

    return data;
  }

  public async deleteHouseService(id: string): Promise<void> {
    const { error } = await supabase
      .from('house_services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting house service:', error);
      throw new Error(`Failed to delete house service: ${error.message}`);
    }
  }
}
