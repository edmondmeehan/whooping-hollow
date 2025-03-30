
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash, Video, Edit } from 'lucide-react';
import { HeroFeature } from '@/hooks/use-hero-features';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from '@/components/ui/skeleton';

interface HeroFeatureCarouselProps {
  heroFeatures: HeroFeature[];
  onEditFeature: (feature: HeroFeature) => void;
  onDeleteFeature: (featureId: string) => void;
}

const HeroFeatureCarousel: React.FC<HeroFeatureCarouselProps> = ({
  heroFeatures,
  onEditFeature,
  onDeleteFeature
}) => {
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Failed to load image:", e.currentTarget.src);
    e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"; // Fallback image
    e.currentTarget.classList.add("error-image");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Features Preview</CardTitle>
        <CardDescription>
          {heroFeatures.length > 1 
            ? "These features will cycle on the homepage. Use the arrows to preview." 
            : "This is how your hero section appears on the homepage."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-4xl mx-auto mb-6">
          <CarouselContent>
            {heroFeatures.map((feature) => (
              <CarouselItem key={feature.id}>
                <div className="p-1">
                  <Card>
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      {!feature.imageUrl ? (
                        <Skeleton className="w-full h-full" />
                      ) : (
                        <img 
                          src={feature.imageUrl} 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      )}
                      
                      {feature.videoUrl && (
                        <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full">
                          <Video className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.subtitle}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onEditFeature(feature)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => onDeleteFeature(feature.id as string)}
                        disabled={heroFeatures.length <= 1}
                        className="flex items-center gap-1"
                      >
                        <Trash className="h-4 w-4" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {heroFeatures.length > 1 && (
            <>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </>
          )}
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default HeroFeatureCarousel;
