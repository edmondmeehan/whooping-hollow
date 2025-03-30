
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ImageIcon, PlusIcon, TrashIcon, UploadIcon, Edit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { fetchAirbnbImages } from '@/utils/airbnbScraper';

interface AirbnbImage {
  url: string;
  alt: string;
}

const AdminImages = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const fetchedImages = await fetchAirbnbImages('1314531825053234635');
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error loading images:', error);
        toast({
          title: 'Error',
          description: 'Failed to load images',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [toast]);

  const handleAddImage = () => {
    if (!newImageUrl || !newImageAlt) {
      toast({
        title: 'Validation Error',
        description: 'Please enter both URL and description',
        variant: 'destructive',
      });
      return;
    }

    const newImage: AirbnbImage = {
      url: newImageUrl,
      alt: newImageAlt,
    };

    setImages([...images, newImage]);
    setNewImageUrl('');
    setNewImageAlt('');

    toast({
      title: 'Success',
      description: 'Image added successfully',
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    toast({
      title: 'Success',
      description: 'Image removed successfully',
    });
  };

  const handleEditImage = (index: number) => {
    setEditingIndex(index);
    setNewImageUrl(images[index].url);
    setNewImageAlt(images[index].alt);
  };

  const handleUpdateImage = () => {
    if (editingIndex === null) return;
    
    const updatedImages = [...images];
    updatedImages[editingIndex] = {
      url: newImageUrl,
      alt: newImageAlt,
    };
    
    setImages(updatedImages);
    setNewImageUrl('');
    setNewImageAlt('');
    setEditingIndex(null);
    
    toast({
      title: 'Success',
      description: 'Image updated successfully',
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Property Images</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input 
                placeholder="Image URL" 
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <Input 
                placeholder="Image Description" 
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              {editingIndex !== null ? (
                <Button onClick={handleUpdateImage} className="bg-amber-500 hover:bg-amber-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Image
                </Button>
              ) : (
                <Button onClick={handleAddImage}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
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
                            onClick={() => handleEditImage(index)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
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
        )}
      </div>
    </div>
  );
};

export default AdminImages;
