
import React from 'react';

interface BookingsHeaderProps {
  selectedTab: 'calendar' | 'direct-bookings';
}

const BookingsHeader: React.FC<BookingsHeaderProps> = ({ selectedTab }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h2 className="text-2xl font-semibold">Booking Management</h2>
    </div>
  );
};

export default BookingsHeader;
