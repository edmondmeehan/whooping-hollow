
import { useState, useEffect } from 'react';
import { GuideCredentials } from '@/types/guide';
import { useToast } from './use-toast';

// Updated initial guide credentials
const initialGuideCredentials: GuideCredentials = {
  username: 'wh',
  password: 'enjoy',
  syncWithWifi: true // Default to synced
};

const STORAGE_KEY_CREDENTIALS = 'guideCredentials';

export const useGuideCredentials = () => {
  const [guideCredentials, setGuideCredentials] = useState<GuideCredentials>(() => {
    // Load from localStorage if available
    const storedCredentials = localStorage.getItem(STORAGE_KEY_CREDENTIALS);
    return storedCredentials ? JSON.parse(storedCredentials) : initialGuideCredentials;
  });
  
  const [showCredentials, setShowCredentials] = useState(false);
  const { toast } = useToast();

  // Save to localStorage whenever guideCredentials changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CREDENTIALS, JSON.stringify(guideCredentials));
  }, [guideCredentials]);

  const handleUpdateCredentials = () => {
    localStorage.setItem(STORAGE_KEY_CREDENTIALS, JSON.stringify(guideCredentials));
    
    toast({
      title: 'Credentials Updated',
      description: 'Guide access credentials have been updated',
    });
    
    setShowCredentials(false);
  };

  const toggleSyncWithWifi = () => {
    setGuideCredentials(prev => ({
      ...prev,
      syncWithWifi: !prev.syncWithWifi
    }));
  };

  return {
    guideCredentials,
    showCredentials,
    setGuideCredentials,
    setShowCredentials,
    handleUpdateCredentials,
    toggleSyncWithWifi
  };
};
