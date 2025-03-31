
import React from 'react';
import { Button } from '@/components/ui/button';

interface BookingRequestsErrorProps {
  error: string;
  onRetry: () => Promise<void>;
}

const BookingRequestsError: React.FC<BookingRequestsErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="p-8 text-center">
      <div className="text-red-500 mb-4">Error: {error}</div>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
};

export default BookingRequestsError;
