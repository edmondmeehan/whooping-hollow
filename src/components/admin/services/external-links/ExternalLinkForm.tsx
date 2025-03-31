
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalServiceLink } from '@/services/admin/external-links-service';
import { Save, X } from 'lucide-react';

interface ExternalLinkFormProps {
  form: ExternalServiceLink;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
  isMobile?: boolean;
}

const ExternalLinkForm: React.FC<ExternalLinkFormProps> = ({
  form,
  onChange,
  onSave,
  onCancel,
  isNew = false,
  isMobile = false
}) => {
  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Service name"
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="url" className="text-sm font-medium">URL</label>
        <Input
          id="url"
          name="url"
          value={form.url}
          onChange={onChange}
          placeholder="https://example.com"
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <Input
          id="description"
          name="description"
          value={form.description || ''}
          onChange={onChange}
          placeholder="Brief description"
          className="mt-1"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-2">
        <Button onClick={onSave} size={isMobile ? "sm" : "default"}>
          <Save className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
          {isNew ? 'Add' : 'Save'}
        </Button>
        <Button 
          onClick={onCancel} 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
        >
          <X className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-1`} />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExternalLinkForm;
