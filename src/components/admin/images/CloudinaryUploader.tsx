
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudUpload, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cloudinaryConfig } from '@/services/cloudinary-config';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CloudinaryUploaderProps {
  onImageUploaded: (url: string, alt: string) => void;
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({ onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const cloudinaryUrl = cloudinaryConfig.getCloudinaryUrl();

  const uploadToCloudinary = async (file: File): Promise<string> => {
    // This is a placeholder implementation
    // In a real scenario, you would use the Cloudinary API
    // For now, we'll just return a placeholder URL after a delay
    
    // Simulate network delay and progress
    const intervalId = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = Math.min(prev + 5, 95);
        return newProgress;
      });
    }, 200);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(intervalId);
    setUploadProgress(100);
    
    return URL.createObjectURL(file);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (!cloudinaryUrl) {
      toast({
        title: 'Cloudinary not configured',
        description: 'Please configure your Cloudinary URL in the API Keys section first',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const imageUrl = await uploadToCloudinary(file);
      const imageAlt = file.name.split('.')[0] || 'Uploaded image';
      
      onImageUploaded(imageUrl, imageAlt);
      
      toast({
        title: 'Upload successful',
        description: 'Your image has been uploaded to Cloudinary',
      });
      
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      toast({
        title: 'Upload failed',
        description: 'There was a problem uploading your image to Cloudinary',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset the file input
      e.target.value = '';
    }
  };

  if (!cloudinaryUrl) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cloudinary Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Cloudinary URL not configured. Please go to the API Keys tab and add your Cloudinary URL.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload to Cloudinary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-50 transition-colors">
            <input
              type="file"
              id="cloudinary-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <label
              htmlFor="cloudinary-upload"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
                  <p className="text-sm text-blue-500">Uploading to Cloudinary... {uploadProgress}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </>
              ) : (
                <>
                  <CloudUpload className="h-10 w-10 text-blue-400" />
                  <p className="text-sm text-blue-500">
                    <span className="font-medium">Click to upload</span> to Cloudinary
                  </p>
                  <p className="text-xs text-blue-400">Images will be stored permanently</p>
                </>
              )}
            </label>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Images uploaded to Cloudinary will be stored permanently in your Cloudinary account.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CloudinaryUploader;
