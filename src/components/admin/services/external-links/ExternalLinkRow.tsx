
import React from 'react';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExternalServiceLink } from '@/types/service-types';
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
  isMobile?: boolean;
}

const ExternalLinkRow: React.FC<ExternalLinkRowProps> = ({
  link,
  isEditing,
  editForm,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onChange,
  isMobile = false
}) => {
  // Only render delete button if the link has an ID
  const canDelete = link.id !== undefined;
  
  return (
    <div className="flex flex-col border rounded-md overflow-hidden">
      {isEditing ? (
        <div className="p-3">
          <ExternalLinkForm 
            form={editForm}
            onChange={onChange}
            onSave={onSave}
            onCancel={onCancel}
            isMobile={isMobile}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-3">
          <a 
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center flex-grow hover:underline"
          >
            <div className="mr-3">
              <ExternalLink className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} text-gray-500`} />
            </div>
            <div className={isMobile ? "text-sm" : ""}>
              <div className="font-medium">{link.name}</div>
              <div className={`${isMobile ? "text-xs" : "text-sm"} text-gray-500`}>{link.description}</div>
            </div>
          </a>
          <div className="flex space-x-1">
            <Button 
              size={isMobile ? "sm" : "icon"} 
              variant="ghost" 
              onClick={() => onEdit(link)}
            >
              <Edit className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
            </Button>
            {canDelete && (
              <Button 
                size={isMobile ? "sm" : "icon"} 
                variant="ghost" 
                onClick={() => link.id && onDelete(link.id)}
              >
                <Trash2 className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalLinkRow;
