
import React from 'react';
import { Key } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HomeSystemItem } from './data/homeSystemsData';

interface HomeSystemsTableProps {
  data: HomeSystemItem[];
}

const HomeSystemsTable: React.FC<HomeSystemsTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>System</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((system, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{system.system}</TableCell>
              <TableCell>
                {system.access && (
                  <div className="flex items-center">
                    {system.system.toLowerCase().includes('lock') && (
                      <Key className="mr-2 h-4 w-4 text-gray-500" />
                    )}
                    <span>{system.access}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="max-w-xs whitespace-normal text-sm">{system.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HomeSystemsTable;
