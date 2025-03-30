
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BookingStatus } from '@/types/booking';

interface StatusBadgeProps {
  status: BookingStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const variantMap: Record<BookingStatus, string> = {
    'new': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'confirmed': 'bg-green-100 text-green-800 hover:bg-green-200',
    'cancelled': 'bg-red-100 text-red-800 hover:bg-red-200'
  };

  return (
    <Badge className={variantMap[status] || ''} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusBadge;
