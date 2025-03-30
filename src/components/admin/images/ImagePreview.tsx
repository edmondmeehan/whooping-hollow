
import React from 'react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90">
        <div className="relative">
          <div className="absolute top-2 right-2 z-10">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
          <div className="flex items-center justify-center p-2">
            <img 
              src={imageUrl} 
              alt={imageAlt} 
              className="max-h-[80vh] max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800';
              }}
            />
          </div>
          <div className="p-4 bg-black/80 text-white">
            <p className="text-center">{imageAlt}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreview;
