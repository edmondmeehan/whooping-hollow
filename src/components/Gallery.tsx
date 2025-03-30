
import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { AspectRatio } from './ui/aspect-ratio';

const Gallery = () => {
  // Airbnb listing images from your specific listing
  const airbnbImages = [
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/dd42ec84-5df3-43bf-9da9-ce67e57f1422.jpeg?im_w=1200',
      alt: 'House Exterior',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/d06bcbbe-1aee-4a23-9c01-d1c1e8b39ef6.jpeg?im_w=1200',
      alt: 'Living Room',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/1c2ba6ef-cdee-4d46-805e-77ad68a81905.jpeg?im_w=1200',
      alt: 'Kitchen',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/98a96c23-79be-47b5-a97d-3a8889cf1f83.jpeg?im_w=1200',
      alt: 'Master Bedroom',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/8bea76df-ec38-4ee9-9f5e-ae7ebc3a3c11.jpeg?im_w=1200',
      alt: 'Bathroom',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/e17bd9fa-1a3f-48da-88e1-9a3200468198.jpeg?im_w=1200',
      alt: 'Patio',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/e4ccb460-0493-4ddc-aaa7-49ddd938cfa5.jpeg?im_w=1200',
      alt: 'Pool Area',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/e8c6da0f-ea99-4102-9776-26022dda8b4c.jpeg?im_w=1200',
      alt: 'Outdoor Space',
    },
    {
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1314531825053234635/original/d60a9597-bb3d-4f5c-812a-cfd0308d5a33.jpeg?im_w=1200',
      alt: 'Bedroom 2',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
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
              {airbnbImages.map((image, index) => (
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
          {airbnbImages.map((image, index) => (
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
