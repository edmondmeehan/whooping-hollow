
import React, { useState } from 'react';
import { TableBody } from '@/components/ui/table';
import { AirbnbImage } from '@/types/image';
import ImagePreview from './ImagePreview';
import EmptyState from './EmptyState';
import AdminImagesLoading from './AdminImagesLoading';
import AdminImagesError from './AdminImagesError';
import ImagesTableHeader from './ImagesTableHeader';
import DraggableImageRow from './DraggableImageRow';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface DraggableImagesGalleryProps {
  images: AirbnbImage[];
  loading: boolean;
  error?: string | null;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onInlineUpdate?: (index: number, updatedImage: AirbnbImage) => void;
  onReorder?: (reorderedImages: AirbnbImage[]) => void;
}

const DraggableImagesGallery: React.FC<DraggableImagesGalleryProps> = ({
  images,
  loading,
  error,
  onEdit,
  onRemove,
  onInlineUpdate,
  onReorder
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{url: string; alt: string} | null>(null);
  const [localImages, setLocalImages] = useState<AirbnbImage[]>(images);
  const [hasChanges, setHasChanges] = useState(false);

  // Update local images when prop changes
  React.useEffect(() => {
    setLocalImages(images);
    setHasChanges(false);
  }, [images]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setLocalImages((items) => {
        const oldIndex = items.findIndex(item => (item.id?.toString() || '') === active.id);
        const newIndex = items.findIndex(item => (item.id?.toString() || '') === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        setHasChanges(true);
        return newItems;
      });
    }
    
    setActiveId(null);
  };

  const handleImagePreview = (image: AirbnbImage) => {
    setPreviewImage({
      url: image.url,
      alt: image.alt
    });
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  const handleSaveOrder = () => {
    if (onReorder) {
      onReorder(localImages);
      setHasChanges(false);
    }
  };

  if (loading) {
    return <AdminImagesLoading />;
  }

  if (error) {
    return <AdminImagesError error={error} />;
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        {hasChanges && (
          <Button 
            onClick={handleSaveOrder} 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4" />
            Save New Order
          </Button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full">
            <ImagesTableHeader showDragHandle={true} />
            <TableBody>
              {localImages.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState />
                  </td>
                </tr>
              ) : (
                <SortableContext
                  items={localImages.map(img => (img.id?.toString() || ''))}
                  strategy={verticalListSortingStrategy}
                >
                  {localImages.map((image, index) => (
                    <DraggableImageRow
                      key={image.id || index}
                      image={image}
                      index={index}
                      onEdit={onEdit}
                      onRemove={onRemove}
                      onInlineUpdate={onInlineUpdate}
                      onPreview={handleImagePreview}
                    />
                  ))}
                </SortableContext>
              )}
            </TableBody>
          </table>
        </DndContext>
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

export default DraggableImagesGallery;
