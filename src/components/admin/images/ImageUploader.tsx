import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ImagePlus, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageUploaderProps {
  onImageUploaded: (file: File, alt: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadError(null);
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setUploadError('Please upload an image file (JPEG, PNG, etc.)');
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPEG, PNG, etc.)',
        variant: 'destructive',
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Please upload an image smaller than 5MB');
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
      
      // Simulate upload progress for UI feedback
      const intervalId = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 10, 90);
          return newProgress;
        });
      }, 300);
      
      const imageAlt = file.name.split('.')[0] || 'Uploaded image';
      
      // Process the upload
      console.log('Starting image upload process for file:', file.name);
      onImageUploaded(file, imageAlt);
      
      clearInterval(intervalId);
      setUploadProgress(100);
      
      // Reset after a delay to provide visual feedback
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1500);
      
    } catch (error: any) {
      console.error('Error initiating upload:', error);
      setUploadError(error.message || 'There was a problem uploading your image');
      toast({
        title: 'Upload failed',
        description: error.message || 'There was a problem uploading your image',
        variant: 'destructive',
      });
      setIsUploading(false);
      setUploadProgress(0);
    } finally {
      // Reset the file input
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    document.getElementById('image-upload')?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload Images to Supabase Storage</CardTitle>
      </CardHeader>
      <CardContent>
        {uploadError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-4">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-gray-400 animate-spin mx-auto" />
                <p className="text-sm text-gray-500 mt-2">Uploading... {uploadProgress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <ImagePlus className="h-10 w-10 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Images will be stored in Supabase storage and linked in the database.
          </p>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={triggerFileInput} disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
