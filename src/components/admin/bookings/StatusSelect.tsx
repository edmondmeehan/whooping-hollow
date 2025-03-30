
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { BookingStatus } from '@/types/booking';

interface StatusSelectProps {
  currentStatus: BookingStatus;
  bookingId: number;
  onStatusChange: (bookingId: number, newStatus: BookingStatus) => void;
  variant?: 'default' | 'compact';
}

const StatusSelect: React.FC<StatusSelectProps> = ({ 
  currentStatus, 
  bookingId, 
  onStatusChange,
  variant = 'compact'
}) => {
  const handleStatusChange = (newStatus: string) => {
    onStatusChange(bookingId, newStatus as BookingStatus);
  };

  return (
    <Select onValueChange={handleStatusChange} defaultValue={currentStatus}>
      <SelectTrigger className={variant === 'compact' ? 'w-[120px]' : 'w-full'}>
        <SelectValue placeholder="Change status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="confirmed">Confirmed</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
