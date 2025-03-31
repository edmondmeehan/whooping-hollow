
import React, { useState } from 'react';
import { ExternalLink, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useExternalLinks } from '@/hooks/admin/use-external-links';
import { ExternalServiceLink } from '@/services/admin/external-links-service';

const EditableExternalServiceLinks: React.FC = () => {
  const { links, isLoading, error, addLink, updateLink, deleteLink } = useExternalLinks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<ExternalServiceLink>({ name: '', url: '', description: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (link: ExternalServiceLink) => {
    setForm(link);
    setEditingId(link.id);
    setIsAdding(false);
  };

  const startAdding = () => {
    setForm({ name: '', url: '', description: '' });
    setIsAdding(true);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const saveEdit = async () => {
    if (editingId) {
      await updateLink({ ...form, id: editingId });
    }
    setEditingId(null);
  };

  const saveNew = async () => {
    await addLink(form);
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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <ExternalLink className="mr-2 h-5 w-5 text-hamptons-accent" />
              External Service Links
            </CardTitle>
            <CardDescription>
              Quick access to important external services
            </CardDescription>
          </div>
          <Button onClick={startAdding} disabled={isAdding || editingId !== null}>
            <Plus className="mr-2 h-4 w-4" /> Add Link
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input 
                  name="name" 
                  value={form.name} 
                  onChange={handleInputChange} 
                  placeholder="Service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <Input 
                  name="url" 
                  value={form.url} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input 
                  name="description" 
                  value={form.description} 
                  onChange={handleInputChange} 
                  placeholder="Brief description"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <Button onClick={saveNew}>
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button variant="outline" onClick={cancelEdit}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {links.map((link) => (
            <div 
              key={link.id}
              className="flex flex-col border rounded-md overflow-hidden"
            >
              {editingId === link.id ? (
                <div className="p-4">
                  <div className="grid gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input 
                        name="name" 
                        value={form.name} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">URL</label>
                      <Input 
                        name="url" 
                        value={form.url} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Input 
                        name="description" 
                        value={form.description} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" onClick={saveEdit}>
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                      <Button size="icon" variant="ghost" onClick={() => startEditing(link)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(link.id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableExternalServiceLinks;
