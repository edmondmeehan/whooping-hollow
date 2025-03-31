
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  getHouseServices, 
  addHouseService, 
  updateHouseService, 
  deleteHouseService,
  HouseService
} from '@/services/admin/house-services-service';

export const useHouseServices = (property?: string) => {
  const [services, setServices] = useState<HouseService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHouseServices(property);
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
      // Ensure the property is included in the service
      const serviceWithProperty = property ? { ...service, property } : service;
      const newService = await addHouseService(serviceWithProperty);
      if (newService) {
        setServices(prev => [...prev, newService]);
        toast({
          title: 'Success',
          description: 'House service added successfully',
        });
      }
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
      // Preserve the property field if it exists
      const updatedService = await updateHouseService(service);
      if (updatedService) {
        setServices(prev => prev.map(s => s.id === service.id ? updatedService : s));
        toast({
          title: 'Success',
          description: 'House service updated successfully',
        });
      }
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
      const success = await deleteHouseService(id);
      if (success) {
        setServices(prev => prev.filter(s => s.id !== id));
        toast({
          title: 'Success',
          description: 'House service deleted successfully',
        });
      }
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
  }, [property]);

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
