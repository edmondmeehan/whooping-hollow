
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AirbnbImage } from '@/types/image';

interface GalleryImageProps {
  image: AirbnbImage;
  index: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index }) => {
  return (
    <AspectRatio ratio={4/3}>
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          console.error(`Error loading image ${index}:`, image.url, e);
          // Set a fallback image on error
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300';
        }}
      />
    </AspectRatio>
  );
};

export default GalleryImage;
