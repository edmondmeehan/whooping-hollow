
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useSubscribers = () => {
  const [subscribers, setSubscribers] = useState<string[]>([]);
  
  useEffect(() => {
    loadSubscribers();
  }, []);
  
  const loadSubscribers = () => {
    try {
      const storedSubscribers = JSON.parse(localStorage.getItem('whh_newsletter_subscribers') || '[]');
      setSubscribers(storedSubscribers);
    } catch (error) {
      console.error('Error loading subscribers:', error);
      setSubscribers([]);
    }
  };
  
  const handleRemoveSubscriber = (email: string) => {
    try {
      const updatedSubscribers = subscribers.filter(sub => sub !== email);
      localStorage.setItem('whh_newsletter_subscribers', JSON.stringify(updatedSubscribers));
      setSubscribers(updatedSubscribers);
      toast.success(`Removed ${email} from subscribers`);
    } catch (error) {
      console.error('Error removing subscriber:', error);
      toast.error('Failed to remove subscriber');
    }
  };
  
  return {
    subscribers,
    handleRemoveSubscriber
  };
};
