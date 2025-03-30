
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface MultipleImagesFormProps {
  multipleUrls: string;
  onUrlsChange: (urls: string) => void;
  onAddMultipleImages: () => void;
}

const MultipleImagesForm: React.FC<MultipleImagesFormProps> = ({
  multipleUrls,
  onUrlsChange,
  onAddMultipleImages
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add Multiple Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Textarea 
            placeholder="Enter one image URL per line" 
            value={multipleUrls}
            onChange={(e) => onUrlsChange(e.target.value)}
            className="min-h-[120px]"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Enter one URL per line. Descriptions will be auto-generated.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={onAddMultipleImages} variant="secondary">
            <FileText className="h-4 w-4 mr-2" />
            Add Multiple Images
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultipleImagesForm;
