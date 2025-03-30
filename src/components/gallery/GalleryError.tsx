
import React from 'react';
import { Button } from '@/components/ui/button';

interface GalleryErrorProps {
  error: string;
}

const GalleryError: React.FC<GalleryErrorProps> = ({ error }) => {
  return (
    <div className="p-8 bg-red-50 rounded-lg border border-red-200">
      <p className="text-red-500 mb-4">{error}</p>
      <Button onClick={() => window.location.reload()}>Retry Loading Images</Button>
    </div>
  );
};

export default GalleryError;
