
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import HouseServiceRow from './HouseServiceRow';

interface HouseService {
  service: string;
  company: string;
  status: string;
  contactName: string;
  phone: string;
  email: string;
  notes: string;
  website: string;
}

interface HouseServicesTableProps {
  services: HouseService[];
}

const HouseServicesTable: React.FC<HouseServicesTableProps> = ({ services }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Service</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service, index) => (
            <HouseServiceRow key={index} service={service} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HouseServicesTable;
