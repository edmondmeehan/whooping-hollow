
import React from 'react';
import SingleImageForm from './images/SingleImageForm';
import MultipleImagesForm from './images/MultipleImagesForm';
import ImagesGallery from './images/ImagesGallery';
import { useImages } from '@/hooks/use-images';

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
    handleUpdateImage
  } = useImages();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Property Images</h2>
        
        <SingleImageForm
          newImageUrl={newImageUrl}
          newImageAlt={newImageAlt}
          editingIndex={editingIndex}
          onUrlChange={setNewImageUrl}
          onAltChange={setNewImageAlt}
          onAddImage={handleAddImage}
          onUpdateImage={handleUpdateImage}
        />
        
        <MultipleImagesForm
          multipleUrls={multipleUrls}
          onUrlsChange={setMultipleUrls}
          onAddMultipleImages={handleAddMultipleImages}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
        <ImagesGallery
          images={images}
          loading={loading}
          onEdit={handleEditImage}
          onRemove={handleRemoveImage}
        />
      </div>
    </div>
  );
};

export default AdminImages;
