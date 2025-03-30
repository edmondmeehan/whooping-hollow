
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AirbnbImage } from '@/types/image';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface GalleryImageProps {
  image: AirbnbImage;
  index: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
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
    <AspectRatio ratio={4/3} className="relative">
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
    </AspectRatio>
  );
};

export default GalleryImage;
