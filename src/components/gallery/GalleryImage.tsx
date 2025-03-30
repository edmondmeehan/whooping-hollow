
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AirbnbImage } from '@/types/image';
import { Skeleton } from '@/components/ui/skeleton';

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
  
  return (
    <AspectRatio ratio={4/3}>
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      <img
        src={hasError ? getFallbackImage() : image.url}
        alt={image.alt || 'Property image'}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading && !hasError ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          console.error(`Error loading image ${index}:`, image.url, e);
          setHasError(true);
          setIsLoading(false);
          // Set a fallback image on error
          (e.target as HTMLImageElement).src = getFallbackImage();
        }}
      />
    </AspectRatio>
  );
};

export default GalleryImage;
