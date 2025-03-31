
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useHouseServices } from '@/hooks/admin/use-house-services';
import { HouseService } from '@/services/admin/house-services-service';
import HouseServicesHeader from './houseServices/HouseServicesHeader';
import HouseServiceForm from './houseServices/HouseServiceForm';
import HouseServicesTable from './houseServices/HouseServicesTable';
import PropertySelector from './PropertySelector';
import { useProperties } from '@/hooks/admin/use-properties';

interface EditableHouseServicesDirectoryProps {
  property?: string;
}

const EditableHouseServicesDirectory: React.FC<EditableHouseServicesDirectoryProps> = ({ property }) => {
  // Only use the property selector internally if not receiving a property from props
  const { properties, selectedProperty, selectProperty } = useProperties();
  const effectiveProperty = property || selectedProperty;
  
  const { services, isLoading, error, addService, updateService, deleteService, reload } = useHouseServices(effectiveProperty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<HouseService>({
    service: '',
    company: '',
    status: 'Active',
    contact_name: '',
    phone: '',
    email: '',
    notes: '',
    website: ''
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
      notes: '',
      website: ''
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

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <HouseServicesHeader
            onAddService={startAdding}
            onRefresh={reload}
            isAddingOrEditing={isAdding || editingId !== null}
          />
          {!property && (
            <PropertySelector 
              properties={properties}
              selectedProperty={selectedProperty}
              onPropertyChange={selectProperty}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <HouseServiceForm
            form={form}
            isAdding={true}
            onInputChange={handleInputChange}
            onStatusChange={handleStatusChange}
            onSave={saveNew}
            onCancel={cancelEdit}
          />
        )}

        {isLoading ? (
          <div>Loading house services directory...</div>
        ) : error ? (
          <div>Error loading house services directory: {error}</div>
        ) : (
          <HouseServicesTable
            services={services}
            editingId={editingId}
            form={form}
            onInputChange={handleInputChange}
            onStatusChange={handleStatusChange}
            onEdit={startEditing}
            onDelete={handleDelete}
            onSave={saveEdit}
            onCancel={cancelEdit}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EditableHouseServicesDirectory;
