
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Save, AlertTriangle, Check } from 'lucide-react';
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
  const [keyJustAdded, setKeyJustAdded] = useState(false);

  useEffect(() => {
    // Load the Cloudinary URL on component mount
    const savedUrl = cloudinaryConfig.getCloudinaryUrl();
    if (savedUrl) {
      setCloudinaryUrl(savedUrl);
    }
    
    // Ensure we have a VisualCrossing API key entry if one doesn't exist
    ensureApiKeyExists('VisualCrossing Weather API', '');

    // Check if we need to auto-populate the weather API key
    const searchParams = new URLSearchParams(window.location.search);
    const weatherKey = searchParams.get('weather_key') || 'CH5RM483EYLMBQN6FRY753DJQ';
    
    if (weatherKey) {
      const weatherKeyObject = apiKeys.find(key => 
        key.name.toLowerCase().includes('weather') || 
        key.name.toLowerCase().includes('visualcrossing')
      );
      
      if (weatherKeyObject && (!weatherKeyObject.key || weatherKeyObject.key.trim() === '')) {
        updateApiKey(weatherKeyObject.id, weatherKey);
        setKeyJustAdded(true);
        
        // Auto save after adding the key
        setTimeout(() => {
          saveApiKeys();
          toast({
            title: "Weather API Key Added",
            description: "The Visual Crossing Weather API key has been added and saved.",
          });
        }, 500);
      }
    }
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
      
      {keyJustAdded && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <Check className="h-5 w-5 text-green-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800">Visual Crossing Weather API Key Added</h3>
            <p className="text-sm text-green-700">
              Your Weather API key has been successfully added and saved. The weather widget will now display real weather data.
            </p>
          </div>
        </div>
      )}
      
      {!hasWeatherApiKey && !keyJustAdded && (
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
