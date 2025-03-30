
import React from 'react';
import { ImageIcon } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
      <ImageIcon className="h-12 w-12 mb-2" />
      <p>No images available</p>
      <p className="text-sm mt-2">Try uploading an image or adding one by URL</p>
    </div>
  );
};

export default EmptyState;
