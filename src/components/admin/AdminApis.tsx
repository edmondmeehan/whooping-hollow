
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ExternalLink,
  CalendarCheck,
  CreditCard,
  Lock,
  Mail,
  Save,
  Trash2
} from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  isVisible: boolean;
}

const AdminApis = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const savedKeys = localStorage.getItem('whh_api_keys');
    return savedKeys ? JSON.parse(savedKeys) : [
      { id: '1', name: 'Airbnb API', key: '', isVisible: false },
      { id: '2', name: 'Email Service', key: '', isVisible: false },
      { id: '3', name: 'Payment Gateway', key: '', isVisible: false },
      { id: '4', name: 'Booking System', key: '', isVisible: false }
    ];
  });

  const [newApiName, setNewApiName] = useState('');
  const [newApiKey, setNewApiKey] = useState('');

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
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely saved.",
    });
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(api => api.id !== id));
    toast({
      title: "API Key Removed",
      description: "The API key has been deleted.",
    });
  };

  const addNewApiKey = () => {
    if (!newApiName.trim() || !newApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a name and key.",
        variant: "destructive",
      });
      return;
    }

    const newApi = {
      id: Date.now().toString(),
      name: newApiName,
      key: newApiKey,
      isVisible: false
    };

    setApiKeys([...apiKeys, newApi]);
    setNewApiName('');
    setNewApiKey('');
    
    toast({
      title: "API Key Added",
      description: "Your new API key has been added.",
    });
  };

  const getIconForApi = (name: string) => {
    if (name.toLowerCase().includes('airbnb')) return <ExternalLink className="h-5 w-5" />;
    if (name.toLowerCase().includes('email')) return <Mail className="h-5 w-5" />;
    if (name.toLowerCase().includes('payment')) return <CreditCard className="h-5 w-5" />;
    if (name.toLowerCase().includes('booking')) return <CalendarCheck className="h-5 w-5" />;
    return <Lock className="h-5 w-5" />;
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
          <Card key={api.id} className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIconForApi(api.name)}
                  <CardTitle>{api.name}</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => deleteApiKey(api.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Securely store your {api.name} credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor={`api-key-${api.id}`}>API Key</Label>
                <div className="flex">
                  <Input
                    id={`api-key-${api.id}`}
                    type={api.isVisible ? "text" : "password"}
                    value={api.key}
                    onChange={(e) => updateApiKey(api.id, e.target.value)}
                    placeholder="Enter your API key"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    className="ml-2" 
                    type="button"
                    onClick={() => toggleVisibility(api.id)}
                  >
                    {api.isVisible ? "Hide" : "Show"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <Card className="shadow-sm bg-muted/50">
        <CardHeader>
          <CardTitle>Add New API Key</CardTitle>
          <CardDescription>
            Add a new third-party service API key
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-api-name">Service Name</Label>
              <Input
                id="new-api-name"
                placeholder="e.g., Google Maps API"
                value={newApiName}
                onChange={(e) => setNewApiName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-api-key">API Key</Label>
              <Input
                id="new-api-key"
                type="password"
                placeholder="Enter API key"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => {
            setNewApiName('');
            setNewApiKey('');
          }}>
            Cancel
          </Button>
          <Button onClick={addNewApiKey}>
            Add API Key
          </Button>
        </CardFooter>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={saveApiKeys}
          className="bg-hamptons-accent hover:bg-hamptons-accent/90 text-hamptons-dark"
        >
          <Save className="mr-2 h-4 w-4" />
          Save All API Keys
        </Button>
      </div>

      <Card className="bg-amber-50 border-amber-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-amber-800">Security Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 text-sm">
            For demonstration purposes, API keys are stored in the browser's local storage. 
            In a production environment, these should be securely stored on a server with proper encryption.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApis;
