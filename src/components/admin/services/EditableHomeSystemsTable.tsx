
import React, { useState } from 'react';
import { Key, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useHomeSystems } from '@/hooks/admin/use-home-systems';
import { HomeSystem } from '@/services/admin/home-systems-service';

const EditableHomeSystemsTable: React.FC = () => {
  const { systems, isLoading, error, addSystem, updateSystem, deleteSystem } = useHomeSystems();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<HomeSystem>({ system: '', access: '', notes: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (system: HomeSystem) => {
    setForm(system);
    setEditingId(system.id);
    setIsAdding(false);
  };

  const startAdding = () => {
    setForm({ system: '', access: '', notes: '' });
    setIsAdding(true);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const saveEdit = async () => {
    if (editingId) {
      await updateSystem({ ...form, id: editingId });
    }
    setEditingId(null);
  };

  const saveNew = async () => {
    await addSystem(form);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this home system?')) {
      await deleteSystem(id);
    }
  };

  if (isLoading) return <div>Loading home systems...</div>;
  if (error) return <div>Error loading home systems: {error}</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={startAdding} disabled={isAdding || editingId !== null}>
          <Plus className="mr-2 h-4 w-4" /> Add System
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>System</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAdding && (
              <TableRow>
                <TableCell>
                  <Input 
                    name="system" 
                    value={form.system} 
                    onChange={handleInputChange} 
                    placeholder="System name"
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    name="access" 
                    value={form.access || ''} 
                    onChange={handleInputChange} 
                    placeholder="Access information"
                  />
                </TableCell>
                <TableCell>
                  <Textarea 
                    name="notes" 
                    value={form.notes || ''} 
                    onChange={handleInputChange} 
                    placeholder="Additional notes"
                    className="min-h-[80px]"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={saveNew}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {systems.map((system) => (
              <TableRow key={system.id}>
                <TableCell className="font-medium">
                  {editingId === system.id ? (
                    <Input 
                      name="system" 
                      value={form.system} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    system.system
                  )}
                </TableCell>
                <TableCell>
                  {editingId === system.id ? (
                    <Input 
                      name="access" 
                      value={form.access || ''} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    system.access && (
                      <div className="flex items-center">
                        {system.system.toLowerCase().includes('lock') && (
                          <Key className="mr-2 h-4 w-4 text-gray-500" />
                        )}
                        <span>{system.access}</span>
                      </div>
                    )
                  )}
                </TableCell>
                <TableCell className="max-w-xs whitespace-normal text-sm">
                  {editingId === system.id ? (
                    <Textarea 
                      name="notes" 
                      value={form.notes || ''} 
                      onChange={handleInputChange} 
                      className="min-h-[80px]"
                    />
                  ) : (
                    system.notes
                  )}
                </TableCell>
                <TableCell>
                  {editingId === system.id ? (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={saveEdit}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => startEditing(system)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(system.id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EditableHomeSystemsTable;
