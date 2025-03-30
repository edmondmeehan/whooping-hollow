
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ImagesTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Preview</TableHead>
        <TableHead>URL</TableHead>
        <TableHead>Description</TableHead>
        <TableHead className="w-[140px] text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default ImagesTableHeader;
