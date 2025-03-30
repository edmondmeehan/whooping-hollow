import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, ImageIcon, TrashIcon } from 'lucide-react';
import { AirbnbImage } from '@/types/image';

interface ImagesGalleryProps {
  images: AirbnbImage[];
  loading: boolean;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

const ImagesGallery: React.FC<ImagesGalleryProps> = ({
  images,
  loading,
  onEdit,
  onRemove
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Preview</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-2" />
                  <p>No images available</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            images.map((image, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-16 h-12 object-cover rounded" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200';
                    }}
                  />
                </TableCell>
                <TableCell className="max-w-xs truncate">{image.url}</TableCell>
                <TableCell>{image.alt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(index)}
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
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImagesGallery;
