
import React from 'react';
import { ExternalServiceLink } from '@/services/admin/external-links-service';
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
  return (
    <div>
      {isAdding && (
        <div className="mb-4 p-4 border rounded-md">
          <ExternalLinkForm 
            form={newLinkForm}
            onChange={onChangeNewForm}
            onSave={onSaveNew}
            onCancel={onCancel}
            isNew={true}
            isMobile={isMobile}
          />
        </div>
      )}

      <div className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-3`}>
        {links.map((link) => (
          <ExternalLinkRow
            key={link.id}
            link={link}
            isEditing={editingId === link.id}
            editForm={editForm}
            onEdit={onStartEditing}
            onDelete={onDelete}
            onSave={onSaveEdit}
            onCancel={onCancel}
            onChange={onChangeEditForm}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default ExternalLinksGrid;
