
import React from 'react';
import { useGalleryImages } from '@/hooks/use-gallery-images';
import GalleryCarousel from './gallery/GalleryCarousel';
import GalleryGrid from './gallery/GalleryGrid';
import GalleryLoading from './gallery/GalleryLoading';
import GalleryError from './gallery/GalleryError';

const Gallery = () => {
  const { images, loading, error } = useGalleryImages();

  return (
    <section className="section-padding bg-gray-50" id="gallery">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-hamptons-dark mb-4">
            Photo Gallery
          </h2>
          
          {loading && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Loading images from our property database...
            </p>
          )}
          
          {!loading && !error && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a visual tour of our beautiful Whooping Hollow property.
            </p>
          )}
        </div>

        {loading && (
          <>
            <div className="md:hidden">
              <GalleryLoading isMobile={true} />
            </div>
            <div className="hidden md:block">
              <GalleryLoading />
            </div>
          </>
        )}

        {error && (
          <div className="text-center">
            <GalleryError error={error} />
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Mobile carousel for smaller screens */}
            <div className="md:hidden">
              <GalleryCarousel images={images} />
            </div>

            {/* Grid display for larger screens */}
            <div className="hidden md:block">
              <GalleryGrid images={images} />
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Manage these images in the <a href="/admin" className="text-coastal-600 hover:underline">Admin Panel</a>.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
