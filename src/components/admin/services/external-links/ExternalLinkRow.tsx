
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { ExternalServiceLink } from '@/types/service-types';
import ExternalLinkForm from './ExternalLinkForm';

interface ExternalLinkRowProps {
  link: ExternalServiceLink;
  editingId: string | null;
  editForm: ExternalServiceLink;
  onStartEditing: (link: ExternalServiceLink) => void;
  onDelete: (id: string) => void;
  onSaveEdit: () => void;
  onCancel: () => void;
  onChangeEditForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValidEditLink: boolean;
}

const ExternalLinkRow: React.FC<ExternalLinkRowProps> = ({
  link,
  editingId,
  editForm,
  onStartEditing,
  onDelete,
  onSaveEdit,
  onCancel,
  onChangeEditForm,
  isValidEditLink
}) => {
  const isEditing = editingId === link.id;
  
  return (
    <Card className="shadow-sm">
      {isEditing ? (
        <>
          <CardContent className="pt-4">
            <ExternalLinkForm 
              link={editForm}
              onChange={onChangeEditForm}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button onClick={onSaveEdit} disabled={!isValidEditLink}>Save</Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className="pt-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{link.name}</h3>
              <p className="text-gray-600 text-sm">{link.description || 'No description'}</p>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-blue-600 text-sm hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                {link.url}
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="icon" onClick={() => onStartEditing(link)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onDelete(link.id!)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ExternalLinkRow;
