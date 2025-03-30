
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ImagesTableHeaderProps {
  showDragHandle?: boolean;
}

const ImagesTableHeader: React.FC<ImagesTableHeaderProps> = ({ showDragHandle = false }) => {
  return (
    <TableHeader>
      <TableRow>
        {showDragHandle && <TableHead className="w-12">Order</TableHead>}
        <TableHead className="w-24">Preview</TableHead>
        <TableHead>Image URL</TableHead>
        <TableHead>Alt Text</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ImagesTableHeader;
