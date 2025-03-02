import { useState, useEffect } from 'react'; // Import useState and useEffect together
import { Card } from '@/components/common';   // Ensure this is the correct path for your Card component
import Button from '@/components/ui/Button';  // Direct import for Button
import Badge from '@/components/ui/Badge';    // Direct import for Badge
import bookingService from '@/services/booking.service'; // Ensure this matches your service file path

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('all'); // all, active, completed

    // Example of using useEffect to fetch data
    useEffect(() => {
        // Fetch bookings from the service
        bookingService.getBookings()
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
            
            <div className="flex gap-4 mb-6">
                <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilter('all')}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'default' : 'outline'}
                    onClick={() => setFilter('active')}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'default' : 'outline'}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </Button>
            </div>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <Card key={booking.id} className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{booking.serviceName}</h3>
                                <p className="text-gray-600">{booking.providerName}</p>
                                <p className="text-sm text-gray-600">{booking.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">${booking.amount}</p>
                                <Badge>{booking.status}</Badge>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Bookings;