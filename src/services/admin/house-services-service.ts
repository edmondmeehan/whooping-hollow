
import { supabase } from '@/integrations/supabase/client';
import { 
  HouseService, 
  HouseServiceInput,
  HouseServiceCategory,
  BaseService 
} from '@/types/service-types';

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

  public async getHouseServices(property?: string): Promise<HouseService[]> {
    let query = supabase
      .from('house_services_directory')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (property) {
      query = query.eq('property', property);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching house services:', error);
      throw new Error(`Failed to fetch house services: ${error.message}`);
    }

    return data || [];
  }

  public async getHouseServiceCategories(): Promise<HouseServiceCategory[]> {
    // If you don't have a separate table for categories, this can be mocked or removed
    // This is just a placeholder - adjust based on your actual data structure
    return [
      { id: '1', name: 'Maintenance' },
      { id: '2', name: 'Cleaning' },
      { id: '3', name: 'Utilities' }
    ];
  }

  public async createHouseService(service: HouseServiceInput): Promise<HouseService> {
    const { data, error } = await supabase
      .from('house_services_directory')
      .insert(service)
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
      .from('house_services_directory')
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

  public async deleteHouseService(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('house_services_directory')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting house service:', error);
      throw new Error(`Failed to delete house service: ${error.message}`);
    }

    return true;
  }
}

// Export service functions for easier usage
export const getHouseServices = async (property?: string): Promise<HouseService[]> => {
  return HouseServicesService.getInstance().getHouseServices(property);
};

export const getHouseServiceCategories = async (): Promise<HouseServiceCategory[]> => {
  return HouseServicesService.getInstance().getHouseServiceCategories();
};

export const addHouseService = async (service: HouseServiceInput): Promise<HouseService> => {
  return HouseServicesService.getInstance().createHouseService(service);
};

export const updateHouseService = async (service: HouseService): Promise<HouseService> => {
  if (!service.id) throw new Error('Service ID is required for updates');
  return HouseServicesService.getInstance().updateHouseService(service.id, service);
};

export const deleteHouseService = async (id: string): Promise<boolean> => {
  return HouseServicesService.getInstance().deleteHouseService(id);
};
