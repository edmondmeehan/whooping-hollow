
import { useEffect, useState } from 'react';

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  isVisible: boolean;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const savedKeys = localStorage.getItem('whh_api_keys');
    return savedKeys ? JSON.parse(savedKeys) : [
      { id: '1', name: 'Airbnb API', key: '', isVisible: false },
      { id: '2', name: 'Email Service', key: '', isVisible: false },
      { id: '3', name: 'Payment Gateway', key: '', isVisible: false },
      { id: '4', name: 'Booking System', key: '', isVisible: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('whh_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const toggleVisibility = (id: string) => {
    setApiKeys(apiKeys.map(api => 
      api.id === id ? { ...api, isVisible: !api.isVisible } : api
    ));
  };

  const updateApiKey = (id: string, key: string) => {
    setApiKeys(apiKeys.map(api => 
      api.id === id ? { ...api, key } : api
    ));
  };

  const saveApiKeys = () => {
    localStorage.setItem('whh_api_keys', JSON.stringify(apiKeys));
    return true;
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(api => api.id !== id));
    return true;
  };

  const addApiKey = (name: string, key: string) => {
    if (!name.trim() || !key.trim()) {
      return false;
    }

    const newApi = {
      id: Date.now().toString(),
      name,
      key,
      isVisible: false
    };

    setApiKeys([...apiKeys, newApi]);
    return true;
  };

  return {
    apiKeys,
    toggleVisibility,
    updateApiKey,
    saveApiKeys,
    deleteApiKey,
    addApiKey
  };
};

export const getIconForApi = (name: string) => {
  if (name.toLowerCase().includes('airbnb')) return 'ExternalLink';
  if (name.toLowerCase().includes('email')) return 'Mail';
  if (name.toLowerCase().includes('payment')) return 'CreditCard';
  if (name.toLowerCase().includes('booking')) return 'CalendarCheck';
  return 'Lock';
};
