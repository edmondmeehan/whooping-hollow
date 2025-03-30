
import React from 'react';
import SingleImageForm from './images/SingleImageForm';
import MultipleImagesForm from './images/MultipleImagesForm';
import ImagesGallery from './images/ImagesGallery';
import ImageUploader from './images/ImageUploader';
import CloudinaryUploader from './images/CloudinaryUploader';
import { useImages } from '@/hooks/use-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Link, Upload, Cloud } from 'lucide-react';

const AdminImages = () => {
  const {
    images,
    loading,
    newImageUrl,
    newImageAlt,
    multipleUrls,
    editingIndex,
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
        <h3 className="text-xl font-semibold mb-4">Image Gallery Database</h3>
        <ImagesGallery
          images={images}
          loading={loading}
          onEdit={handleEditImage}
          onRemove={handleRemoveImage}
          onInlineUpdate={handleInlineUpdateImage}
        />
      </div>
    </div>
  );
};

export default AdminImages;
