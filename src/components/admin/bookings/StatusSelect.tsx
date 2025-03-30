
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

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'blocked', label: 'Blocked' }
  ];

  return (
    <Select onValueChange={handleStatusChange} defaultValue={currentStatus}>
      <SelectTrigger className={variant === 'compact' ? 'w-[120px]' : 'w-full'}>
        <SelectValue placeholder="Change status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
