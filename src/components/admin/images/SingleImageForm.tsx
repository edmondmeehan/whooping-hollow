
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, PlusIcon } from 'lucide-react';

interface SingleImageFormProps {
  newImageUrl: string;
  newImageAlt: string;
  editingIndex: number | null;
  onUrlChange: (url: string) => void;
  onAltChange: (alt: string) => void;
  onAddImage: () => void;
  onUpdateImage: () => void;
}

const SingleImageForm: React.FC<SingleImageFormProps> = ({
  newImageUrl,
  newImageAlt,
  editingIndex,
  onUrlChange,
  onAltChange,
  onAddImage,
  onUpdateImage
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Add Single Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input 
            placeholder="Image URL" 
            value={newImageUrl}
            onChange={(e) => onUrlChange(e.target.value)}
          />
          <Input 
            placeholder="Image Description" 
            value={newImageAlt}
            onChange={(e) => onAltChange(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          {editingIndex !== null ? (
            <Button onClick={onUpdateImage} className="bg-amber-500 hover:bg-amber-600">
              <Edit className="h-4 w-4 mr-2" />
              Update Image
            </Button>
          ) : (
            <Button onClick={onAddImage}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleImageForm;
