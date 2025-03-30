
import React from 'react';
import { AirbnbImage } from '@/types/image';
import { Card, CardContent } from '@/components/ui/card';
import GalleryImage from './GalleryImage';

interface GalleryGridProps {
  images: AirbnbImage[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <Card key={index} className="overflow-hidden rounded-lg shadow-md card-hover">
          <CardContent className="p-0">
            <GalleryImage image={image} index={index} />
            <div className="p-4 bg-white">
              <h3 className="font-medium text-gray-800">{image.alt}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GalleryGrid;
