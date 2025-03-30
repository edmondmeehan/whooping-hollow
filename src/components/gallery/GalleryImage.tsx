
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AirbnbImage } from '@/types/image';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface GalleryImageProps {
  image: AirbnbImage;
  index: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  
  // List of fallback images to use when the main image fails to load
  const fallbackImages = [
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
  ];
  
  // Get a deterministic fallback based on the index
  const getFallbackImage = () => {
    return fallbackImages[index % fallbackImages.length];
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Error loading image ${index}:`, image.url);
    setHasError(true);
    setIsLoading(false);
    // Set a fallback image on error
    (e.target as HTMLImageElement).src = getFallbackImage();
  };
  
  return (
    <>
      <AspectRatio ratio={4/3} className="relative group cursor-pointer" onClick={() => setShowFullImage(true)}>
        {isLoading && !hasError && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        )}
        
        {hasError && (
          <div className="absolute top-2 right-2 z-10 bg-red-100 text-red-600 p-1 rounded-full">
            <AlertCircle className="h-4 w-4" />
          </div>
        )}
        
        <img
          src={hasError ? getFallbackImage() : image.url}
          alt={image.alt || 'Property image'}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading && !hasError ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
        
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/80 p-2 rounded-full">
            <ZoomIn className="h-5 w-5 text-gray-800" />
          </div>
        </div>
      </AspectRatio>
      
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/90">
          <div className="relative">
            <div className="absolute top-2 right-2 z-10">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setShowFullImage(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DialogClose>
            </div>
            <div className="flex items-center justify-center p-4">
              <img 
                src={hasError ? getFallbackImage() : image.url} 
                alt={image.alt || 'Property image'} 
                className="max-h-[80vh] max-w-full object-contain"
                onError={handleImageError}
              />
            </div>
            <div className="p-4 bg-black/80 text-white">
              <p className="text-center">{image.alt || 'Property image'}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryImage;
