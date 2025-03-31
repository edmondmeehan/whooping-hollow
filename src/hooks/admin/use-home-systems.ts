
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchHomeSystems, 
  addHomeSystem, 
  updateHomeSystem, 
  deleteHomeSystem,
  HomeSystem
} from '@/services/admin/home-systems-service';

export const useHomeSystems = () => {
  const [systems, setSystems] = useState<HomeSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadSystems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchHomeSystems();
      setSystems(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load home systems');
      toast({
        title: 'Error',
        description: err.message || 'Failed to load home systems',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSystem = async (system: HomeSystem) => {
    try {
      const newSystem = await addHomeSystem(system);
      setSystems(prev => [...prev, newSystem]);
      toast({
        title: 'Success',
        description: 'Home system added successfully',
      });
      return newSystem;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to add home system',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateSystem = async (system: HomeSystem) => {
    try {
      const updatedSystem = await updateHomeSystem(system);
      setSystems(prev => prev.map(s => s.id === system.id ? updatedSystem : s));
      toast({
        title: 'Success',
        description: 'Home system updated successfully',
      });
      return updatedSystem;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update home system',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteSystem = async (id: string) => {
    try {
      await deleteHomeSystem(id);
      setSystems(prev => prev.filter(s => s.id !== id));
      toast({
        title: 'Success',
        description: 'Home system deleted successfully',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete home system',
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    loadSystems();
  }, []);

  return {
    systems,
    isLoading,
    error,
    reload: loadSystems,
    addSystem,
    updateSystem,
    deleteSystem
  };
};
