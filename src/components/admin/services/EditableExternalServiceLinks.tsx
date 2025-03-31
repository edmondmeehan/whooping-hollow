
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useExternalLinks } from '@/hooks/admin/use-external-links';
import { ExternalServiceLink } from '@/services/admin/external-links-service';
import ExternalLinksHeader from './external-links/ExternalLinksHeader';
import ExternalLinksGrid from './external-links/ExternalLinksGrid';
import PropertySelector from './PropertySelector';
import { useProperties } from '@/hooks/admin/use-properties';

const EditableExternalServiceLinks: React.FC = () => {
  const { properties, selectedProperty, selectProperty } = useProperties();
  const { links, isLoading, error, addLink, updateLink, deleteLink, reload } = useExternalLinks(selectedProperty);
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

  if (isLoading) return <div>Loading external service links...</div>;
  if (error) return <div>Error loading external service links: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <ExternalLinksHeader 
            onAddLink={startAdding}
            onRefresh={reload}
            isAddingOrEditing={isAdding || editingId !== null}
          />
          <PropertySelector 
            properties={properties}
            selectedProperty={selectedProperty}
            onPropertyChange={selectProperty}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading external service links...</div>
        ) : error ? (
          <div>Error loading external service links: {error}</div>
        ) : (
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
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EditableExternalServiceLinks;
