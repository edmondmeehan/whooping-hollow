
import React from 'react';
import { AirbnbImage } from '@/types/image';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import GalleryImage from './GalleryImage';

interface GalleryCarouselProps {
  images: AirbnbImage[];
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="overflow-hidden rounded-lg shadow-md card-hover">
              <CardContent className="p-0">
                <GalleryImage image={image} index={index} />
                <div className="p-4 bg-white">
                  <h3 className="font-medium text-gray-800">{image.alt}</h3>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default GalleryCarousel;
