
import React from 'react';
import SingleImageForm from './images/SingleImageForm';
import MultipleImagesForm from './images/MultipleImagesForm';
import ImagesGallery from './images/ImagesGallery';
import ImageUploader from './images/ImageUploader';
import CloudinaryUploader from './images/CloudinaryUploader';
import { useImages } from '@/hooks/use-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Link, Upload, Cloud, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminImages = () => {
  const {
    images,
    loading,
    error,
    newImageUrl,
    newImageAlt,
    multipleUrls,
    editingIndex,
    refreshImages,
    setNewImageUrl,
    setNewImageAlt,
    setMultipleUrls,
    handleAddImage,
    handleAddMultipleImages,
    handleRemoveImage,
    handleEditImage,
    handleUpdateImage,
    handleAddUploadedImage,
    handleInlineUpdateImage
  } = useImages();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Property Images</h2>
        
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Add by URL</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Upload to Supabase</span>
            </TabsTrigger>
            <TabsTrigger value="cloudinary" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              <span>Cloudinary</span>
            </TabsTrigger>
            <TabsTrigger value="multiple" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Multiple URLs</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url">
            <SingleImageForm
              newImageUrl={newImageUrl}
              newImageAlt={newImageAlt}
              editingIndex={editingIndex}
              onUrlChange={setNewImageUrl}
              onAltChange={setNewImageAlt}
              onAddImage={handleAddImage}
              onUpdateImage={handleUpdateImage}
            />
          </TabsContent>
          
          <TabsContent value="upload">
            <ImageUploader onImageUploaded={handleAddUploadedImage} />
          </TabsContent>
          
          <TabsContent value="cloudinary">
            <CloudinaryUploader onImageUploaded={handleAddUploadedImage} />
          </TabsContent>
          
          <TabsContent value="multiple">
            <MultipleImagesForm
              multipleUrls={multipleUrls}
              onUrlsChange={setMultipleUrls}
              onAddMultipleImages={handleAddMultipleImages}
            />
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Image Gallery Database</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshImages} 
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" /> Refresh Images
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {error}. Make sure your Supabase connection is working and the property_images table exists.
            </AlertDescription>
          </Alert>
        )}
        
        <ImagesGallery
          images={images}
          loading={loading}
          error={error}
          onEdit={handleEditImage}
          onRemove={handleRemoveImage}
          onInlineUpdate={handleInlineUpdateImage}
        />
      </div>
    </div>
  );
};

export default AdminImages;
