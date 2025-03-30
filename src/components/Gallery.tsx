
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { AspectRatio } from './ui/aspect-ratio';
import { fetchAirbnbImages } from '@/utils/airbnbScraper';
import { Skeleton } from './ui/skeleton';

interface AirbnbImage {
  url: string;
  alt: string;
}

const Gallery = () => {
  const [images, setImages] = useState<AirbnbImage[]>([]);
  const [loading, setLoading] = useState(true);
  const listingId = '1314531825053234635'; // This should be configurable

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const fetchedImages = await fetchAirbnbImages(listingId);
      setImages(fetchedImages);
      setLoading(false);
    };

    loadImages();
  }, [listingId]);

  // Loading state
  if (loading) {
    return (
      <section className="section-padding bg-gray-50" id="gallery">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-hamptons-dark mb-4">
              Photo Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Loading images from our Whooping Hollow property...
            </p>
          </div>
          
          {/* Skeleton loader for mobile */}
          <div className="md:hidden">
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
          </div>
          
          {/* Skeleton loader for desktop */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50" id="gallery">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-hamptons-dark mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a visual tour of our beautiful Whooping Hollow property.
          </p>
        </div>

        {/* Mobile carousel for smaller screens */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden rounded-lg shadow-md card-hover">
                    <CardContent className="p-0">
                      <AspectRatio ratio={4/3}>
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </AspectRatio>
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
        </div>

        {/* Grid display for larger screens */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden rounded-lg shadow-md card-hover">
              <CardContent className="p-0">
                <AspectRatio ratio={4/3}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
                <div className="p-4 bg-white">
                  <h3 className="font-medium text-gray-800">{image.alt}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            More photos available on our <a href="https://www.airbnb.com/rooms/1314531825053234635" className="text-coastal-600 hover:underline" target="_blank" rel="noopener noreferrer">Airbnb listing</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
