
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { AirbnbImage } from '@/types/image';
import ImagePreview from './ImagePreview';
import EmptyState from './EmptyState';
import AdminImagesLoading from './AdminImagesLoading';
import AdminImagesError from './AdminImagesError';
import ImagesTableHeader from './ImagesTableHeader';
import ImageTableRow from './ImageTableRow';

interface ImagesGalleryProps {
  images: AirbnbImage[];
  loading: boolean;
  error?: string | null;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onInlineUpdate?: (index: number, updatedImage: AirbnbImage) => void;
}

const ImagesGallery: React.FC<ImagesGalleryProps> = ({
  images,
  loading,
  error,
  onEdit,
  onRemove,
  onInlineUpdate
}) => {
  const [previewImage, setPreviewImage] = React.useState<{url: string; alt: string} | null>(null);

  const handleImagePreview = (image: AirbnbImage) => {
    setPreviewImage({
      url: image.url,
      alt: image.alt
    });
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  if (loading) {
    return <AdminImagesLoading />;
  }

  if (error) {
    return <AdminImagesError error={error} />;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <ImagesTableHeader />
          <TableBody>
            {images.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              images.map((image, index) => (
                <ImageTableRow
                  key={image.id || index}
                  image={image}
                  index={index}
                  onEdit={onEdit}
                  onRemove={onRemove}
                  onInlineUpdate={onInlineUpdate}
                  onPreview={handleImagePreview}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {previewImage && (
        <ImagePreview 
          isOpen={!!previewImage}
          onClose={closeImagePreview}
          imageUrl={previewImage.url}
          imageAlt={previewImage.alt}
        />
      )}
    </>
  );
};

export default ImagesGallery;
