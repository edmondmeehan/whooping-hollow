
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useApiKeys } from './apis/apiKeyUtils';
import ApiKeyCard from './apis/ApiKeyCard';
import AddApiKeyForm from './apis/AddApiKeyForm';
import SecurityNotice from './apis/SecurityNotice';

const AdminApis = () => {
  const { toast } = useToast();
  const { 
    apiKeys, 
    toggleVisibility, 
    updateApiKey, 
    saveApiKeys, 
    deleteApiKey, 
    addApiKey 
  } = useApiKeys();

  const handleSaveApiKeys = () => {
    saveApiKeys();
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely saved.",
    });
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Third-Party API Keys</h2>
        <p className="text-muted-foreground">Manage API keys for integration with external services.</p>
      </div>

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
