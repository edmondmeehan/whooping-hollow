
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudUpload, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCloudinaryUpload } from '@/hooks/use-cloudinary-upload';

interface CloudinaryUploaderProps {
  onImageUploaded: (file: File, alt: string) => void;
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({ onImageUploaded }) => {
  const { 
    isUploading, 
    uploadProgress, 
    cloudinaryUrl
  } = useCloudinaryUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const imageAlt = file.name.split('.')[0] || 'Uploaded image';
    
    // Pass the file to the parent component's handler
    onImageUploaded(file, imageAlt);
    
    // Reset the file input
    e.target.value = '';
  };

  if (!cloudinaryUrl) {
    return <CloudinaryConfigurationAlert />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload to Cloudinary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <CloudinaryDropZone 
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            onFileChange={handleFileChange}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Images uploaded to Cloudinary will be stored in Supabase database.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const CloudinaryConfigurationAlert = () => (
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

interface CloudinaryDropZoneProps {
  isUploading: boolean;
  uploadProgress: number;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CloudinaryDropZone: React.FC<CloudinaryDropZoneProps> = ({ 
  isUploading, 
  uploadProgress, 
  onFileChange 
}) => (
  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:bg-blue-50 transition-colors">
    <input
      type="file"
      id="cloudinary-upload"
      className="hidden"
      accept="image/*"
      onChange={onFileChange}
      disabled={isUploading}
    />
    <label
      htmlFor="cloudinary-upload"
      className="cursor-pointer flex flex-col items-center justify-center gap-2"
    >
      {isUploading ? (
        <UploadingIndicator progress={uploadProgress} />
      ) : (
        <UploadPrompt />
      )}
    </label>
  </div>
);

const UploadPrompt = () => (
  <>
    <CloudUpload className="h-10 w-10 text-blue-400" />
    <p className="text-sm text-blue-500">
      <span className="font-medium">Click to upload</span> to Cloudinary
    </p>
    <p className="text-xs text-blue-400">Images will be stored permanently</p>
  </>
);

interface UploadingIndicatorProps {
  progress: number;
}

const UploadingIndicator: React.FC<UploadingIndicatorProps> = ({ progress }) => (
  <>
    <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
    <p className="text-sm text-blue-500">Uploading to Cloudinary... {progress}%</p>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </>
);

export default CloudinaryUploader;
