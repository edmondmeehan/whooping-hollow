
import React, { useState } from 'react';
import { useBookings } from '@/hooks/use-bookings';
import BookingTable from './BookingTable';
import BookingDetailsModal from './BookingDetailsModal';
import BookingCreateModal from './BookingCreateModal';
import { Booking, BookingStatus } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, CalendarRange, RefreshCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const CalendarTab = () => {
  const { 
    bookings, 
    statusFilter, 
    handleStatusChange, 
    updateStatusFilter, 
    addBooking, 
    deleteBooking,
    isLoading,
    refreshBookings
  } = useBookings();
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'booking' | 'block'>('booking');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
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
  
  const handleRefreshCalendar = async () => {
    setIsRefreshing(true);
    await refreshBookings();
    setIsRefreshing(false);
    toast.success('Calendar refreshed');
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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
          
          <Button 
            variant="outline" 
            onClick={handleRefreshCalendar} 
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Calendar
              </>
            )}
          </Button>
          
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

      {isLoading ? (
        <div className="text-center py-10">
          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading bookings...</p>
        </div>
      ) : (
        <BookingTable 
          bookings={bookings} 
          onStatusChange={handleStatusChange}
          onBookingClick={handleBookingClick}
          onDeleteBooking={handleDeleteBooking}
        />
      )}
      
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
    </>
  );
};

export default CalendarTab;
