
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryLoadingProps {
  isMobile?: boolean;
}

const GalleryLoading: React.FC<GalleryLoadingProps> = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3].map((_, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden rounded-lg shadow-md">
                <CardContent className="p-0">
                  <AspectRatio ratio={4/3}>
                    <Skeleton className="w-full h-full" />
                  </AspectRatio>
                  <div className="p-4 bg-white">
                    <Skeleton className="h-4 w-32" />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <Card key={index} className="overflow-hidden rounded-lg shadow-md">
          <CardContent className="p-0">
            <AspectRatio ratio={4/3}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
            <div className="p-4 bg-white">
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';

export default GalleryLoading;
