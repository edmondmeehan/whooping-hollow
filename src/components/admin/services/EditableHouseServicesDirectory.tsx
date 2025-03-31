
import React, { useState } from 'react';
import { Link, Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHouseServices } from '@/hooks/admin/use-house-services';
import { HouseService } from '@/services/admin/house-services-service';

const EditableHouseServicesDirectory: React.FC = () => {
  const { services, isLoading, error, addService, updateService, deleteService, reload } = useHouseServices();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<HouseService>({
    service: '',
    company: '',
    status: 'Active',
    contact_name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setForm(prev => ({ ...prev, status: value }));
  };

  const startEditing = (service: HouseService) => {
    setForm(service);
    setEditingId(service.id);
    setIsAdding(false);
  };

  const startAdding = () => {
    setForm({
      service: '',
      company: '',
      status: 'Active',
      contact_name: '',
      phone: '',
      email: '',
      notes: ''
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const saveEdit = async () => {
    if (editingId) {
      await updateService({ ...form, id: editingId });
    }
    setEditingId(null);
  };

  const saveNew = async () => {
    await addService(form);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this house service?')) {
      await deleteService(id);
    }
  };

  if (isLoading) return <div>Loading house services directory...</div>;
  if (error) return <div>Error loading house services directory: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Link className="mr-2 h-5 w-5 text-hamptons-accent" />
              House Services Directory
            </CardTitle>
            <CardDescription>
              Complete information about all house services and contacts
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={reload}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={startAdding} disabled={isAdding || editingId !== null}>
              <Plus className="mr-2 h-4 w-4" /> Add Service
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-4 p-4 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service</label>
                <Input 
                  name="service" 
                  value={form.service} 
                  onChange={handleInputChange} 
                  placeholder="Service type"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input 
                  name="company" 
                  value={form.company} 
                  onChange={handleInputChange} 
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select
                  value={form.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Updated">Updated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name</label>
                <Input 
                  name="contact_name" 
                  value={form.contact_name || ''} 
                  onChange={handleInputChange} 
                  placeholder="Contact person"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input 
                  name="phone" 
                  value={form.phone || ''} 
                  onChange={handleInputChange} 
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  name="email" 
                  value={form.email || ''} 
                  onChange={handleInputChange} 
                  placeholder="Email address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <Textarea 
                  name="notes" 
                  value={form.notes || ''} 
                  onChange={handleInputChange} 
                  placeholder="Additional notes"
                  className="min-h-[80px]"
                />
              </div>
              <div className="md:col-span-2 flex space-x-2 mt-2">
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

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  {editingId === service.id ? (
                    <>
                      <TableCell>
                        <Input 
                          name="service" 
                          value={form.service} 
                          onChange={handleInputChange} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="company" 
                          value={form.company} 
                          onChange={handleInputChange} 
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={form.status}
                          onValueChange={handleStatusChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                            <SelectItem value="Updated">Updated</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="contact_name" 
                          value={form.contact_name || ''} 
                          onChange={handleInputChange} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="phone" 
                          value={form.phone || ''} 
                          onChange={handleInputChange} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="email" 
                          value={form.email || ''} 
                          onChange={handleInputChange} 
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea 
                          name="notes" 
                          value={form.notes || ''} 
                          onChange={handleInputChange} 
                          className="min-h-[80px]"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" onClick={saveEdit}>
                            <Save className="h-4 w-4 mr-1" /> Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{service.service}</TableCell>
                      <TableCell>{service.company}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          service.status === 'Updated' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {service.status}
                        </span>
                      </TableCell>
                      <TableCell>{service.contact_name}</TableCell>
                      <TableCell>{service.phone}</TableCell>
                      <TableCell>
                        {service.email && (
                          <a 
                            href={`mailto:${service.email}`}
                            className="text-hamptons-accent hover:underline"
                          >
                            {service.email}
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs whitespace-normal text-sm">{service.notes}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" onClick={() => startEditing(service)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(service.id!)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableHouseServicesDirectory;
