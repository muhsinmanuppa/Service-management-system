import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/hooks/useAuth'; // Ensure you have this hook to get user info
import axios from 'axios';

const Dashboard = () => {
  const { todayBookings, earnings, fetchBookings } = useBookings();
  const { user } = useAuth(); // Get user details (including verification status)
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(user?.verified || false); // Initially from user data

  // Update verified state when user data changes
  useEffect(() => {
    if (user?.verified !== undefined) {
      setVerified(user.verified);
    }
  }, [user]);

  // Function to handle status update
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      setLoading(true);
      await axios.put(`/bookings/${bookingId}`, { status });
      fetchBookings(); // Refresh bookings after update
    } catch (error) {
      console.error('Error updating booking status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to request OTP for verification
  const sendOTP = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/otp/send`, { email: user.email }); // Ensure the correct endpoint
      if (response.data.success) {
        setOtpSent(true);
      } else {
        console.error('Error sending OTP:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Function to verify OTP
  const verifyOTP = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/otp/verify`, { email: user.email, otp });
      if (response.data.success) {
        setVerified(true); // Mark as verified
      } else {
        console.error('OTP verification failed:', response.data.message);
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  // If user is not verified, show OTP verification
  if (!verified) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Verify Your Account</h2>
        {!otpSent ? (
          <Button onClick={sendOTP}>Send OTP</Button>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <Button onClick={verifyOTP}>Verify</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Provider Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold">Today's Bookings</h3>
          <p className="text-2xl font-bold">{todayBookings?.length || 0}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Total Earnings</h3>
          <p className="text-2xl font-bold">${earnings?.total || 0}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Completion Rate</h3>
          <p className="text-2xl font-bold">95%</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Rating</h3>
          <p className="text-2xl font-bold">4.8/5</p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          {todayBookings?.map((booking) => (
            <Card key={booking.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{booking.serviceName}</h3>
                  <p className="text-gray-600">{booking.clientName}</p>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                </div>
                <Button
                  variant={booking.status === 'completed' ? 'outline' : 'default'}
                  onClick={() => handleStatusUpdate(booking.id, 'completed')}
                  disabled={loading}
                >
                  {booking.status === 'completed' ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
