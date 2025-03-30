
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BookingStatus } from '@/types/booking';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

type StatusConfig = {
  className: string;
  label: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig: Record<BookingStatus, StatusConfig> = {
    'new': {
      className: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      label: 'New'
    },
    'confirmed': {
      className: 'bg-green-100 text-green-800 hover:bg-green-200',
      label: 'Confirmed'
    },
    'cancelled': {
      className: 'bg-red-100 text-red-800 hover:bg-red-200',
      label: 'Cancelled'
    },
    'blocked': {
      className: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
      label: 'Blocked'
    }
  };

  const config = statusConfig[status];

  return (
    <Badge 
      className={cn(config.className, className)} 
      variant="outline"
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
