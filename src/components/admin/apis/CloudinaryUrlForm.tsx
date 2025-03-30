
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cloud, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CloudinaryUrlFormProps {
  cloudinaryUrl: string;
  onUpdateCloudinaryUrl: (url: string) => void;
}

const CloudinaryUrlForm: React.FC<CloudinaryUrlFormProps> = ({ 
  cloudinaryUrl, 
  onUpdateCloudinaryUrl 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  const handleSave = () => {
    if (cloudinaryUrl) {
      toast({
        title: "Cloudinary URL updated",
        description: "Your Cloudinary configuration has been saved"
      });
    }
  };
  
  return (
    <Card className="shadow-sm bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-blue-600" />
          <CardTitle>Cloudinary Configuration</CardTitle>
        </div>
        <CardDescription>
          Securely store your Cloudinary URL for image uploads and management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="cloudinary-url">Cloudinary URL</Label>
          <div className="flex">
            <Input
              id="cloudinary-url"
              type={isVisible ? "text" : "password"}
              value={cloudinaryUrl}
              onChange={(e) => onUpdateCloudinaryUrl(e.target.value)}
              placeholder="cloudinary://<api_key>:<api_secret>@<cloud_name>"
              className="flex-1"
            />
            <Button 
              variant="outline" 
              className="ml-2" 
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <p className="text-xs text-blue-600 mt-2">
            Format: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-blue-50 text-xs text-blue-700 pt-0 flex justify-between">
        <p>
          Your Cloudinary URL is used for image uploads and management. For better security,
          consider using the Supabase integration to store this URL securely.
        </p>
        <Button size="sm" onClick={handleSave} className="ml-2">Save</Button>
      </CardFooter>
    </Card>
  );
};

export default CloudinaryUrlForm;
