
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Check, X, TrashIcon, ZoomIn, AlertCircle, GripVertical } from 'lucide-react';
import { AirbnbImage } from '@/types/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableImageRowProps {
  image: AirbnbImage;
  index: number;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onInlineUpdate?: (index: number, updatedImage: AirbnbImage) => void;
  onPreview: (image: AirbnbImage) => void;
}

const DraggableImageRow: React.FC<DraggableImageRowProps> = ({
  image,
  index,
  onEdit,
  onRemove,
  onInlineUpdate,
  onPreview
}) => {
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editingAlt, setEditingAlt] = useState('');
  const [editingUrl, setEditingUrl] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: image.id?.toString() || '',
    disabled: editingRowIndex === index
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as 'relative'
  };

  const handleStartEditing = () => {
    setEditingRowIndex(index);
    setEditingAlt(image.alt);
    setEditingUrl(image.url);
  };

  const handleCancelEditing = () => {
    setEditingRowIndex(null);
  };

  const handleSaveEditing = () => {
    if (onInlineUpdate) {
      onInlineUpdate(index, {
        ...image,
        alt: editingAlt,
        url: editingUrl
      });
    }
    setEditingRowIndex(null);
  };

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b hover:bg-muted/50">
      <td className="px-4 py-2">
        <div 
          className="cursor-grab active:cursor-grabbing" 
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
      </td>
      <td className="px-4 py-2">
        {imageLoadError ? (
          <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-gray-400" />
          </div>
        ) : (
          <div 
            className="cursor-pointer hover:opacity-80 transition-opacity relative group"
            onClick={() => onPreview(image)}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-16 h-12 object-cover rounded" 
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
              <ZoomIn className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </td>
      <td className="px-4 py-2 max-w-xs">
        {editingRowIndex === index ? (
          <Input 
            value={editingUrl} 
            onChange={(e) => setEditingUrl(e.target.value)} 
            className="w-full text-sm"
          />
        ) : (
          <div className="truncate">{image.url}</div>
        )}
      </td>
      <td className="px-4 py-2">
        {editingRowIndex === index ? (
          <Input 
            value={editingAlt} 
            onChange={(e) => setEditingAlt(e.target.value)} 
            className="w-full"
          />
        ) : (
          image.alt
        )}
      </td>
      <td className="px-4 py-2 text-right">
        <div className="flex justify-end gap-2">
          {editingRowIndex === index ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSaveEditing}
                className="bg-green-50 hover:bg-green-100 border-green-200"
              >
                <Check className="h-4 w-4 text-green-600" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCancelEditing}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPreview(image)}
                className="bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <ZoomIn className="h-4 w-4 text-blue-600" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onInlineUpdate ? handleStartEditing() : onEdit(index)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onRemove(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default DraggableImageRow;
