
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddApiKeyFormProps {
  onAddApiKey: (name: string, key: string) => boolean;
}

const AddApiKeyForm: React.FC<AddApiKeyFormProps> = ({ onAddApiKey }) => {
  const [newApiName, setNewApiName] = useState('');
  const [newApiKey, setNewApiKey] = useState('');

  const handleAddKey = () => {
    if (onAddApiKey(newApiName, newApiKey)) {
      setNewApiName('');
      setNewApiKey('');
    }
  };

  return (
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
        <Button onClick={handleAddKey}>
          Add API Key
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddApiKeyForm;
