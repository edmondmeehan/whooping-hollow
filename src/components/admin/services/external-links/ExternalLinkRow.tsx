
import React from 'react';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExternalServiceLink } from '@/services/admin/external-links-service';
import ExternalLinkForm from './ExternalLinkForm';

interface ExternalLinkRowProps {
  link: ExternalServiceLink;
  isEditing: boolean;
  editForm: ExternalServiceLink;
  onEdit: (link: ExternalServiceLink) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExternalLinkRow: React.FC<ExternalLinkRowProps> = ({
  link,
  isEditing,
  editForm,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onChange
}) => {
  return (
    <div className="flex flex-col border rounded-md overflow-hidden">
      {isEditing ? (
        <ExternalLinkForm 
          form={editForm}
          onChange={onChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <div className="flex items-center justify-between p-3">
          <a 
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center flex-grow hover:underline"
          >
            <div className="mr-3">
              <ExternalLink className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <div className="font-medium">{link.name}</div>
              <div className="text-sm text-gray-500">{link.description}</div>
            </div>
          </a>
          <div className="flex space-x-1">
            <Button size="icon" variant="ghost" onClick={() => onEdit(link)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => onDelete(link.id!)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalLinkRow;
