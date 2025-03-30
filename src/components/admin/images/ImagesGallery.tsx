
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Edit, ImageIcon, TrashIcon, Check, X, AlertCircle, ZoomIn } from 'lucide-react';
import { AirbnbImage } from '@/types/image';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ImagePreview from './ImagePreview';

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
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [editingAlt, setEditingAlt] = useState('');
  const [editingUrl, setEditingUrl] = useState('');
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<number, boolean>>({});
  const [previewImage, setPreviewImage] = useState<{url: string; alt: string} | null>(null);

  const handleStartEditing = (index: number) => {
    setEditingRowIndex(index);
    setEditingAlt(images[index].alt);
    setEditingUrl(images[index].url);
  };

  const handleCancelEditing = () => {
    setEditingRowIndex(null);
  };

  const handleSaveEditing = (index: number) => {
    if (onInlineUpdate) {
      onInlineUpdate(index, {
        ...images[index],
        alt: editingAlt,
        url: editingUrl
      });
    }
    setEditingRowIndex(null);
  };

  const handleImageError = (index: number) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [index]: true
    }));
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

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Preview</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[140px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mb-2" />
                    <p>No images available</p>
                    <p className="text-sm mt-2">Try uploading an image or adding one by URL</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              images.map((image, index) => (
                <TableRow key={image.id || index}>
                  <TableCell>
                    {imageLoadErrors[index] ? (
                      <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-gray-400" />
                      </div>
                    ) : (
                      <div 
                        className="cursor-pointer hover:opacity-80 transition-opacity relative group"
                        onClick={() => handleImagePreview(image)}
                      >
                        <img 
                          src={image.url} 
                          alt={image.alt} 
                          className="w-16 h-12 object-cover rounded" 
                          onError={() => handleImageError(index)}
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                          <ZoomIn className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    {editingRowIndex === index ? (
                      <Input 
                        value={editingUrl} 
                        onChange={(e) => setEditingUrl(e.target.value)} 
                        className="w-full text-sm"
                      />
                    ) : (
                      <div className="truncate">{image.url}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRowIndex === index ? (
                      <Input 
                        value={editingAlt} 
                        onChange={(e) => setEditingAlt(e.target.value)} 
                        className="w-full"
                      />
                    ) : (
                      image.alt
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {editingRowIndex === index ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSaveEditing(index)}
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
                            onClick={() => handleImagePreview(image)}
                            className="bg-blue-50 hover:bg-blue-100 border-blue-200"
                          >
                            <ZoomIn className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onInlineUpdate ? handleStartEditing(index) : onEdit(index)}
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
                  </TableCell>
                </TableRow>
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
