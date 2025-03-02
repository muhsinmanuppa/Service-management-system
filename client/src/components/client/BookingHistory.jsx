import { format } from 'date-fns';
import { Card } from '@/components/common';

const BookingHistory = ({ bookings }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{booking.service.name}</h3>
              <p className="text-gray-600">
                {format(new Date(booking.scheduledAt), 'PPP p')}
              </p>
              <p className="text-gray-600">{booking.provider.name}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>
          
          {booking.status === 'completed' && (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center">
                <span className="text-gray-600">Rating:</span>
                <div className="ml-2 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= booking.rating ? 'text-yellow-400' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              {booking.feedback && (
                <p className="mt-2 text-gray-600">{booking.feedback}</p>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default BookingHistory;