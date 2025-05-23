
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ExternalServiceLink } from '@/types/service-types';
import ExternalLinkRow from './ExternalLinkRow';
import ExternalLinkForm from './ExternalLinkForm';

interface ExternalLinksGridProps {
  links: ExternalServiceLink[];
  isAdding: boolean;
  editingId: string | null;
  newLinkForm: ExternalServiceLink;
  editForm: ExternalServiceLink;
  onStartEditing: (link: ExternalServiceLink) => void;
  onDelete: (id: string) => void;
  onSaveEdit: () => void;
  onSaveNew: () => void;
  onCancel: () => void;
  onChangeNewForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEditForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMobile?: boolean;
}

const ExternalLinksGrid: React.FC<ExternalLinksGridProps> = ({
  links,
  isAdding,
  editingId,
  newLinkForm,
  editForm,
  onStartEditing,
  onDelete,
  onSaveEdit,
  onSaveNew,
  onCancel,
  onChangeNewForm,
  onChangeEditForm,
  isMobile = false
}) => {
  // Form validation for new link
  const isValidNewLink = newLinkForm.name && newLinkForm.url && newLinkForm.description;
  
  // Form validation for edit link  
  const isValidEditLink = editForm.name && editForm.url && editForm.description;

  return (
    <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
      {isAdding && (
        <Card className="shadow-md border-2 border-dashed border-gray-300">
          <CardContent className="pt-4">
            <ExternalLinkForm 
              link={newLinkForm}
              onChange={onChangeNewForm}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button onClick={onSaveNew} disabled={!isValidNewLink}>Save</Button>
          </CardFooter>
        </Card>
      )}

      {links.map(link => (
        <ExternalLinkRow
          key={link.id}
          link={link}
          editingId={editingId}
          editForm={editForm}
          onStartEditing={onStartEditing}
          onDelete={onDelete}
          onSaveEdit={onSaveEdit}
          onCancel={onCancel}
          onChangeEditForm={onChangeEditForm}
          isValidEditLink={isValidEditLink}
        />
      ))}
      
      {!isAdding && links.length === 0 && (
        <Card className="flex items-center justify-center h-40 bg-gray-50">
          <p className="text-gray-500">No external links found. Add one to get started.</p>
        </Card>
      )}
    </div>
  );
};

export default ExternalLinksGrid;
