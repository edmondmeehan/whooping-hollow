
import React, { useState } from 'react';
import BookingTable from './bookings/BookingTable';
import { useBookings } from '@/hooks/use-bookings';
import BookingDetailsModal from './bookings/BookingDetailsModal';
import BookingCreateModal from './bookings/BookingCreateModal';
import { Booking, BookingStatus } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { PlusCircle, CalendarRange } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminBookings = () => {
  const { bookings, statusFilter, handleStatusChange, updateStatusFilter, addBooking, deleteBooking } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'booking' | 'block'>('booking');
  
  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };
  
  const handleCloseModal = () => {
    setSelectedBooking(null);
  };

  const handleOpenCreateModal = (mode: 'booking' | 'block') => {
    setCreateMode(mode);
    setIsCreateModalOpen(true);
  };
  
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  
  const handleCreateBooking = (newBooking: Omit<Booking, 'id' | 'created_at'>) => {
    addBooking(newBooking);
    setIsCreateModalOpen(false);
  };

  const handleDeleteBooking = (bookingId: number) => {
    deleteBooking(bookingId);
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking(null);
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-semibold">Booking Management</h2>
        
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
          <Select 
            value={statusFilter} 
            onValueChange={(value) => updateStatusFilter(value as BookingStatus | 'all')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="blocked">Blocked Dates</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Button onClick={() => handleOpenCreateModal('booking')} className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Booking</span>
            </Button>
            
            <Button variant="outline" onClick={() => handleOpenCreateModal('block')} className="flex items-center gap-1">
              <CalendarRange className="h-4 w-4" />
              <span>Block Dates</span>
            </Button>
          </div>
        </div>
      </div>
      
      <BookingTable 
        bookings={bookings} 
        onStatusChange={handleStatusChange}
        onBookingClick={handleBookingClick}
        onDeleteBooking={handleDeleteBooking}
      />
      
      {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          isOpen={!!selectedBooking} 
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onDeleteBooking={handleDeleteBooking}
        />
      )}
      
      <BookingCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateBooking={handleCreateBooking}
        mode={createMode}
      />
    </div>
  );
};

export default AdminBookings;
