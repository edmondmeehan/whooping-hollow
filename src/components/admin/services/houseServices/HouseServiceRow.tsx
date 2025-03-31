
import React from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HouseService } from '@/services/admin/house-services-service';
import HouseServiceStatusBadge from '../houseServicesDirectory/HouseServiceStatusBadge';

interface HouseServiceRowProps {
  service: HouseService;
  editingId: string | null;
  form: HouseService;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStatusChange: (value: string) => void;
  onEdit: (service: HouseService) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const HouseServiceRow: React.FC<HouseServiceRowProps> = ({
  service,
  editingId,
  form,
  onInputChange,
  onStatusChange,
  onEdit,
  onDelete,
  onSave,
  onCancel
}) => {
  const isEditing = editingId === service.id;

  return (
    <TableRow key={service.id}>
      {isEditing ? (
        <>
          <TableCell>
            <Input 
              name="service" 
              value={form.service} 
              onChange={onInputChange} 
            />
          </TableCell>
          <TableCell>
            <Input 
              name="company" 
              value={form.company} 
              onChange={onInputChange} 
            />
          </TableCell>
          <TableCell>
            <Select
              value={form.status}
              onValueChange={onStatusChange}
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
              onChange={onInputChange} 
            />
          </TableCell>
          <TableCell>
            <Input 
              name="phone" 
              value={form.phone || ''} 
              onChange={onInputChange} 
            />
          </TableCell>
          <TableCell>
            <Input 
              name="email" 
              value={form.email || ''} 
              onChange={onInputChange} 
            />
          </TableCell>
          <TableCell>
            <Textarea 
              name="notes" 
              value={form.notes || ''} 
              onChange={onInputChange} 
              className="min-h-[80px]"
            />
          </TableCell>
          <TableCell>
            <div className="flex space-x-1">
              <Button size="sm" onClick={onSave}>
                <Save className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={onCancel}>
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
            <HouseServiceStatusBadge status={service.status} />
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
              <Button size="sm" variant="ghost" onClick={() => onEdit(service)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => onDelete(service.id!)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default HouseServiceRow;
