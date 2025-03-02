import { useState, useEffect } from 'react';
import { useBookings } from '../../hooks/useBookings';
import { Card } from '../../components/ui/Card'; 
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error'; 

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed, cancelled
  const { getProviderBookings, updateBookingStatus } = useBookings();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getProviderBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      // Update local state to reflect the change
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      ));
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' ? true : booking.status === filter
  );

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={fetchBookings}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {booking.service.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Client: {booking.client.name}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Time: {new Date(booking.time).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-600">
                  Duration: {booking.duration} minutes
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Price: ${booking.price}
                </p>
              </div>

              {booking.status === 'pending' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {booking.status === 'confirmed' && (
                <button
                  onClick={() => handleStatusUpdate(booking.id, 'completed')}
                  className="mt-4 w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </Card>
        ))}

        {filteredBookings.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderBookings;