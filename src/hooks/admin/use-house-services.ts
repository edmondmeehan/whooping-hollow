
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchHouseServices, 
  addHouseService, 
  updateHouseService, 
  deleteHouseService,
  HouseService
} from '@/services/admin/house-services-service';

export const useHouseServices = () => {
  const [services, setServices] = useState<HouseService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchHouseServices();
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load house services');
      toast({
        title: 'Error',
        description: err.message || 'Failed to load house services',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addService = async (service: HouseService) => {
    try {
      const newService = await addHouseService(service);
      setServices(prev => [...prev, newService]);
      toast({
        title: 'Success',
        description: 'House service added successfully',
      });
      return newService;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to add house service',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateService = async (service: HouseService) => {
    try {
      const updatedService = await updateHouseService(service);
      setServices(prev => prev.map(s => s.id === service.id ? updatedService : s));
      toast({
        title: 'Success',
        description: 'House service updated successfully',
      });
      return updatedService;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update house service',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteHouseService(id);
      setServices(prev => prev.filter(s => s.id !== id));
      toast({
        title: 'Success',
        description: 'House service deleted successfully',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete house service',
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return {
    services,
    isLoading,
    error,
    reload: loadServices,
    addService,
    updateService,
    deleteService
  };
};
