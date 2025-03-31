
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchExternalServiceLinks, 
  addExternalServiceLink, 
  updateExternalServiceLink, 
  deleteExternalServiceLink,
  ExternalServiceLink
} from '@/services/admin/external-links-service';

export const useExternalLinks = () => {
  const [links, setLinks] = useState<ExternalServiceLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadLinks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchExternalServiceLinks();
      setLinks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load external service links');
      toast({
        title: 'Error',
        description: err.message || 'Failed to load external service links',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addLink = async (link: ExternalServiceLink) => {
    try {
      const newLink = await addExternalServiceLink(link);
      setLinks(prev => [...prev, newLink]);
      toast({
        title: 'Success',
        description: 'External service link added successfully',
      });
      return newLink;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to add external service link',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const updateLink = async (link: ExternalServiceLink) => {
    try {
      const updatedLink = await updateExternalServiceLink(link);
      setLinks(prev => prev.map(l => l.id === link.id ? updatedLink : l));
      toast({
        title: 'Success',
        description: 'External service link updated successfully',
      });
      return updatedLink;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update external service link',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const deleteLink = async (id: string) => {
    try {
      await deleteExternalServiceLink(id);
      setLinks(prev => prev.filter(l => l.id !== id));
      toast({
        title: 'Success',
        description: 'External service link deleted successfully',
      });
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete external service link',
        variant: 'destructive',
      });
      throw err;
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  return {
    links,
    isLoading,
    error,
    reload: loadLinks,
    addLink,
    updateLink,
    deleteLink
  };
};
