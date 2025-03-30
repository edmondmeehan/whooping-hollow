
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ImagePlus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageUploaded: (url: string, alt: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPEG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate upload progress
      const intervalId = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 10, 90);
          return newProgress;
        });
      }, 300);
      
      // This is where you would normally upload to a server
      // For now, we'll create a local object URL as a demo
      const imageUrl = URL.createObjectURL(file);
      const imageAlt = file.name.split('.')[0] || 'Uploaded image';
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(intervalId);
      setUploadProgress(100);
      
      // Send the URL back to the parent component
      onImageUploaded(imageUrl, imageAlt);
      
      toast({
        title: 'Upload successful',
        description: 'Your image has been uploaded',
      });
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload failed',
        description: 'There was a problem uploading your image',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset the file input
      e.target.value = '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
                  <p className="text-sm text-gray-500">Uploading... {uploadProgress}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </>
              ) : (
                <>
                  <ImagePlus className="h-10 w-10 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
            </label>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Note: Images are temporarily stored in your browser and will be lost when you close the page.
            For permanent storage, configure Cloudinary or another image hosting service.
          </p>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
