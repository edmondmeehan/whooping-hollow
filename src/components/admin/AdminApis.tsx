
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Save, AlertTriangle } from 'lucide-react';
import { useApiKeys } from './apis/apiKeyUtils';
import ApiKeyCard from './apis/ApiKeyCard';
import AddApiKeyForm from './apis/AddApiKeyForm';
import SecurityNotice from './apis/SecurityNotice';
import { cloudinaryConfig } from '@/services/cloudinary-config';
import CloudinaryUrlForm from './apis/CloudinaryUrlForm';

const AdminApis = () => {
  const { toast } = useToast();
  const { 
    apiKeys, 
    toggleVisibility, 
    updateApiKey, 
    saveApiKeys, 
    deleteApiKey, 
    addApiKey,
    ensureApiKeyExists
  } = useApiKeys();
  
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [hasWeatherApiKey, setHasWeatherApiKey] = useState(false);

  useEffect(() => {
    // Load the Cloudinary URL on component mount
    const savedUrl = cloudinaryConfig.getCloudinaryUrl();
    if (savedUrl) {
      setCloudinaryUrl(savedUrl);
    }
    
    // Ensure we have a VisualCrossing API key entry if one doesn't exist
    ensureApiKeyExists('VisualCrossing Weather API', '');
  }, [ensureApiKeyExists]);

  useEffect(() => {
    // Check if the VisualCrossing API key is set
    const weatherKey = apiKeys.find(api => 
      api.name.toLowerCase().includes('weather') || 
      api.name.toLowerCase().includes('visualcrossing')
    );
    
    setHasWeatherApiKey(!!weatherKey && !!weatherKey.key && weatherKey.key.trim() !== '');
  }, [apiKeys]);

  const handleSaveApiKeys = () => {
    saveApiKeys();
    // Also save the Cloudinary URL if it exists
    if (cloudinaryUrl) {
      cloudinaryConfig.setCloudinaryUrl(cloudinaryUrl);
    }
    
    // Check if we have a weather API key after saving
    const weatherKey = apiKeys.find(api => 
      api.name.toLowerCase().includes('weather') || 
      api.name.toLowerCase().includes('visualcrossing')
    );
    
    if (weatherKey && weatherKey.key && weatherKey.key.trim() !== '') {
      toast({
        title: "API Keys Saved",
        description: "Your API keys have been securely saved.",
      });
    } else {
      toast({
        title: "API Keys Saved",
        description: "Weather functionality requires a VisualCrossing Weather API key.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteApiKey = (id: string) => {
    deleteApiKey(id);
    toast({
      title: "API Key Removed",
      description: "The API key has been deleted.",
    });
  };

  const handleAddApiKey = (name: string, key: string) => {
    const success = addApiKey(name, key);
    
    if (success) {
      toast({
        title: "API Key Added",
        description: "Your new API key has been added.",
      });
      return true;
    } else {
      toast({
        title: "Error",
        description: "Please provide both a name and key.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleUpdateCloudinaryUrl = (url: string) => {
    setCloudinaryUrl(url);
    toast({
      title: "Cloudinary URL Updated",
      description: "Your Cloudinary URL has been updated. Don't forget to save your changes.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Third-Party API Keys</h2>
        <p className="text-muted-foreground">Manage API keys for integration with external services.</p>
      </div>

      <Separator />
      
      {!hasWeatherApiKey && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Weather Widget Needs API Key</h3>
            <p className="text-sm text-amber-700">
              To display real weather data, add your VisualCrossing Weather API key below. 
              You can get a free API key by signing up at{' '}
              <a 
                href="https://www.visualcrossing.com/weather-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                VisualCrossing
              </a>.
            </p>
          </div>
        </div>
      )}
      
      <CloudinaryUrlForm 
        cloudinaryUrl={cloudinaryUrl} 
        onUpdateCloudinaryUrl={handleUpdateCloudinaryUrl} 
      />

      <Separator />

      <div className="grid gap-6">
        {apiKeys.map(api => (
          <ApiKeyCard
            key={api.id}
            api={api}
            onToggleVisibility={toggleVisibility}
            onUpdateKey={updateApiKey}
            onDelete={handleDeleteApiKey}
          />
        ))}
      </div>

      <Separator />

      <AddApiKeyForm onAddApiKey={handleAddApiKey} />

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveApiKeys}
          className="bg-hamptons-accent hover:bg-hamptons-accent/90 text-hamptons-dark"
        >
          <Save className="mr-2 h-4 w-4" />
          Save All API Keys
        </Button>
      </div>

      <SecurityNotice />
    </div>
  );
};

export default AdminApis;
