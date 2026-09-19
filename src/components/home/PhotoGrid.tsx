import React from 'react';
import { useGalleryImages } from '@/hooks/use-gallery-images';
import { defaultPhotos } from '@/data/default-photos';

interface GridPhoto {
  url: string;
  alt: string;
  wide: boolean;
}

const PhotoGrid: React.FC = () => {
  const { images, loading, usingDemoImages } = useGalleryImages();

  const adminPhotos: GridPhoto[] = images.map((image, index) => ({
    url: image.url,
    alt: image.alt || 'Property photo',
    wide: index % 5 === 0,
  }));

  const fallbackPhotos: GridPhoto[] = defaultPhotos.map((photo) => ({
    url: photo.url,
    alt: photo.alt,
    wide: Boolean(photo.wide),
  }));

  const photos = !loading && !usingDemoImages && adminPhotos.length > 0 ? adminPhotos : fallbackPhotos;

  return (
    <section
      id="photos"
      className="hh-gutter pt-[clamp(48px,6vw,80px)]"
    >
      <div
        className="grid gap-4 [grid-auto-flow:dense] [grid-auto-rows:260px] [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]"
      >
        {photos.map((photo, index) => (
          <img
            key={`${photo.url}-${index}`}
            src={photo.url}
            alt={photo.alt}
            loading="lazy"
            className={`h-full w-full rounded-2xl object-cover ${photo.wide ? 'sm:col-span-2' : ''}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PhotoGrid;
