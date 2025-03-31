
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import HouseServiceStatusBadge from './HouseServiceStatusBadge';
import HouseServiceContactInfo from './HouseServiceContactInfo';
import HouseServiceNotes from './HouseServiceNotes';
import HouseServiceWebsite from './HouseServiceWebsite';

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

interface HouseServiceRowProps {
  service: HouseService;
  index: number;
}

const HouseServiceRow: React.FC<HouseServiceRowProps> = ({ service, index }) => {
  return (
    <TableRow className={index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
      <TableCell className="font-medium">{service.service}</TableCell>
      <TableCell>{service.company}</TableCell>
      <TableCell>
        <HouseServiceStatusBadge status={service.status} />
      </TableCell>
      <TableCell>{service.contactName || '—'}</TableCell>
      <TableCell>
        <HouseServiceContactInfo phone={service.phone} email={service.email} />
      </TableCell>
      <TableCell className="max-w-xs">
        <HouseServiceNotes notes={service.notes} />
      </TableCell>
      <TableCell>
        <HouseServiceWebsite website={service.website} />
      </TableCell>
    </TableRow>
  );
};

export default HouseServiceRow;
