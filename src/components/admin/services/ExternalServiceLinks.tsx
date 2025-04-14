
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useExternalLinks } from '@/hooks/admin/use-external-links';
import { ExternalServiceLink } from '@/types/service-types';
import ExternalLinksHeader from './external-links/ExternalLinksHeader';
import ExternalLinksGrid from './external-links/ExternalLinksGrid';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExternalServiceLinksProps {
  property?: string;
}

const ExternalServiceLinks: React.FC<ExternalServiceLinksProps> = ({ property }) => {
  const isMobile = useIsMobile();
  const { links, isLoading, error, addLink, updateLink, deleteLink, reload } = useExternalLinks(property);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState<ExternalServiceLink>({ name: '', url: '', description: '' });
  const [editForm, setEditForm] = useState<ExternalServiceLink>({ name: '', url: '', description: '' });

  const handleNewFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const startAdding = () => {
    setNewForm({ name: '', url: '', description: '' });
    setIsAdding(true);
    setEditingId(null);
  };

  const startEditing = (link: ExternalServiceLink) => {
    setEditForm(link);
    setEditingId(link.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const saveEdit = async () => {
    if (editingId) {
      await updateLink({ ...editForm, id: editingId });
    }
    setEditingId(null);
  };
  
  const saveNew = async () => {
    await addLink(newForm);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service link?')) {
      await deleteLink(id);
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading external service links...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error loading external service links: {error}</div>;

  return (
    <Card className={isMobile ? "mx-0" : ""}>
      <CardHeader className={isMobile ? "px-3 py-4" : ""}>
        <ExternalLinksHeader 
          onAddLink={startAdding}
          onRefresh={reload}
          isAddingOrEditing={isAdding || editingId !== null}
          isMobile={isMobile}
        />
      </CardHeader>
      <CardContent className={isMobile ? "px-3 pb-4" : ""}>
        <ExternalLinksGrid 
          links={links}
          isAdding={isAdding}
          editingId={editingId}
          newLinkForm={newForm}
          editForm={editForm}
          onStartEditing={startEditing}
          onDelete={handleDelete}
          onSaveEdit={saveEdit}
          onSaveNew={saveNew}
          onCancel={cancelEdit}
          onChangeNewForm={handleNewFormChange}
          onChangeEditForm={handleEditFormChange}
          isMobile={isMobile}
        />
      </CardContent>
    </Card>
  );
};

export default ExternalServiceLinks;
