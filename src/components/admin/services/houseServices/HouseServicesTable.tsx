
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HouseService } from '@/services/admin/house-services-service';
import HouseServiceRow from './HouseServiceRow';

interface HouseServicesTableProps {
  services: HouseService[];
  editingId: string | null;
  form: HouseService;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStatusChange: (value: string) => void;
  onEdit: (service: HouseService) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const HouseServicesTable: React.FC<HouseServicesTableProps> = ({
  services,
  editingId,
  form,
  onInputChange,
  onStatusChange,
  onEdit,
  onDelete,
  onSave,
  onCancel
}) => {
  return (
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
            <HouseServiceRow
              key={service.id}
              service={service}
              editingId={editingId}
              form={form}
              onInputChange={onInputChange}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
              onSave={onSave}
              onCancel={onCancel}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HouseServicesTable;
