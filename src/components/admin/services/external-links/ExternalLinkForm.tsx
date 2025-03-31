
import React from 'react';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalServiceLink } from '@/services/admin/external-links-service';

interface ExternalLinkFormProps {
  form: ExternalServiceLink;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
}

const ExternalLinkForm: React.FC<ExternalLinkFormProps> = ({
  form,
  onChange,
  onSave,
  onCancel,
  isNew = false
}) => {
  return (
    <div className="p-4">
      <div className="grid gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input 
            name="name" 
            value={form.name} 
            onChange={onChange} 
            placeholder="Service name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <Input 
            name="url" 
            value={form.url} 
            onChange={onChange} 
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Input 
            name="description" 
            value={form.description} 
            onChange={onChange} 
            placeholder="Brief description"
          />
        </div>
        <div className="flex space-x-2 mt-2">
          <Button size={isNew ? "default" : "sm"} onClick={onSave}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button size={isNew ? "default" : "sm"} variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkForm;
