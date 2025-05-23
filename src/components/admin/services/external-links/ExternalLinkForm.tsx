
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalServiceLink } from '@/types/service-types';

interface ExternalLinkFormProps {
  link: ExternalServiceLink;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExternalLinkForm: React.FC<ExternalLinkFormProps> = ({ link, onChange }) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="name">Link Name</Label>
        <Input
          id="name"
          name="name"
          value={link.name}
          onChange={onChange}
          placeholder="Enter link name"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          value={link.url}
          onChange={onChange}
          placeholder="Enter URL (https://...)"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={link.description || ''}
          onChange={onChange}
          placeholder="Enter description"
          className="mt-1"
          required
        />
      </div>
    </div>
  );
};

export default ExternalLinkForm;
