
import React from 'react';
import { useGalleryImages } from '@/hooks/use-gallery-images';
import GalleryCarousel from './gallery/GalleryCarousel';
import GalleryGrid from './gallery/GalleryGrid';
import GalleryLoading from './gallery/GalleryLoading';
import GalleryError from './gallery/GalleryError';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';

const Gallery = () => {
  const { images, loading, error, usingDemoImages } = useGalleryImages();

  return (
    <section className="py-24 md:py-32 bg-background" id="gallery">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-semibold">Gallery</span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            A Visual Tour
          </h2>
          
          {loading && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading images...
            </p>
          )}
          
          {!loading && !error && !usingDemoImages && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the beauty of Whooping Hollow through our lens.
            </p>
          )}

          {usingDemoImages && (
            <Alert variant="default" className="max-w-3xl mx-auto mb-6 mt-4 bg-accent/10 border-accent/30">
              <AlertCircle className="h-4 w-4 text-accent" />
              <AlertDescription className="text-muted-foreground">
                Demo Mode: Showing sample images.
              </AlertDescription>
            </Alert>
          )}
        </motion.div>

        {loading && (
          <>
            <div className="md:hidden"><GalleryLoading isMobile={true} /></div>
            <div className="hidden md:block"><GalleryLoading /></div>
          </>
        )}

        {error && !usingDemoImages && (
          <div className="text-center"><GalleryError error={error} /></div>
        )}

        {!loading && (usingDemoImages || !error) && (
          <>
            <div className="md:hidden"><GalleryCarousel images={images} /></div>
            <div className="hidden md:block"><GalleryGrid images={images} /></div>
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
