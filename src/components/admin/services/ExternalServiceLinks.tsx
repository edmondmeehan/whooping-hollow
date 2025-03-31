
import React, { useState } from 'react';
import { Link as LinkIcon, ExternalLink, Edit, Save, X, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useExternalLinks } from '@/hooks/admin/use-external-links';

const ExternalServiceLinks = () => {
  const { links, isLoading, error, updateLink, reload } = useExternalLinks();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', url: '', description: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (link: { id: string; name: string; url: string; description: string }) => {
    setForm({
      name: link.name,
      url: link.url,
      description: link.description
    });
    setEditingId(link.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string) => {
    await updateLink({ ...form, id });
    setEditingId(null);
  };

  if (isLoading) return <div>Loading external service links...</div>;
  if (error) return <div>Error loading external service links: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <LinkIcon className="mr-2 h-5 w-5 text-hamptons-accent" />
              External Service Links
            </CardTitle>
            <CardDescription>
              Quick access to important external services
            </CardDescription>
          </div>
          <Button variant="outline" onClick={reload}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
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
                      <Button size="sm" onClick={() => saveEdit(link.id!)}>
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
                    <Button size="icon" variant="ghost" onClick={() => startEditing(link)}>
                      <Edit className="h-4 w-4" />
                    </Button>
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

export default ExternalServiceLinks;
