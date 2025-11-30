
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Save, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cloudinaryConfig } from '@/services/cloudinary-config';
import CloudinaryUrlForm from './apis/CloudinaryUrlForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const AdminApis = () => {
  const { toast } = useToast();
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');

  useEffect(() => {
    // Load the Cloudinary URL on component mount
    const savedUrl = cloudinaryConfig.getCloudinaryUrl();
    if (savedUrl) {
      setCloudinaryUrl(savedUrl);
    }
  }, []);

  const handleSaveCloudinaryUrl = () => {
    if (cloudinaryUrl) {
      cloudinaryConfig.setCloudinaryUrl(cloudinaryUrl);
      toast({
        title: "Cloudinary URL Saved",
        description: "Your Cloudinary configuration has been saved.",
      });
    }
  };

  const handleUpdateCloudinaryUrl = (url: string) => {
    setCloudinaryUrl(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">API & Integration Settings</h2>
        <p className="text-muted-foreground">Manage integrations and API configurations.</p>
      </div>

      <Separator />

      <Alert className="bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Server-Side API Keys:</strong> Private API keys (like Resend for emails) are securely stored in Supabase Secrets and used in edge functions.
          <a 
            href="https://supabase.com/dashboard/project/cpryayfndzfeyfrnsesr/settings/functions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center ml-2 underline hover:no-underline"
          >
            Manage Secrets <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Cloudinary Configuration</CardTitle>
          <CardDescription>
            Configure your Cloudinary URL for image uploads
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CloudinaryUrlForm 
            cloudinaryUrl={cloudinaryUrl} 
            onUpdateCloudinaryUrl={handleUpdateCloudinaryUrl} 
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveCloudinaryUrl}
              className="bg-hamptons-accent hover:bg-hamptons-accent/90 text-hamptons-dark"
              disabled={!cloudinaryUrl}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">Weather API Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 text-sm mb-3">
            The weather widget uses the VisualCrossing Weather API. To enable weather data:
          </p>
          <ol className="list-decimal list-inside text-amber-700 text-sm space-y-2">
            <li>Get a free API key from <a href="https://www.visualcrossing.com/weather-api" target="_blank" rel="noopener noreferrer" className="underline">VisualCrossing</a></li>
            <li>Add it as a Supabase secret named <code className="bg-amber-100 px-1 rounded">WEATHER_API_KEY</code></li>
            <li>Use it in your edge functions to fetch weather data</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApis;
