
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HouseService } from '@/services/admin/house-services-service';
import HouseServiceRow from './HouseServiceRow';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const isMobile = useIsMobile();
  
  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Service</TableHead>
              <TableHead className="w-[150px]">Company</TableHead>
              <TableHead className="w-[110px]">Status</TableHead>
              <TableHead className="w-[120px]">Contact</TableHead>
              {!isMobile && (
                <>
                  <TableHead className="w-[120px]">Phone</TableHead>
                  <TableHead className="w-[150px]">Email</TableHead>
                  <TableHead className="w-[110px]">Website</TableHead>
                </>
              )}
              <TableHead className={isMobile ? "w-[150px]" : "w-[200px]"}>Notes</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
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
                isMobile={isMobile}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default HouseServicesTable;
