import React from 'react';
import { Card } from '@/components/ui/card';
import { useBookings } from '@/hooks/useBookings';

const Dashboard = () => {
  const { recentBookings } = useBookings();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome Back!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold">Active Bookings</h3>
          <p className="text-2xl font-bold">5</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Completed Services</h3>
          <p className="text-2xl font-bold">12</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Total Spent</h3>
          <p className="text-2xl font-bold">$420</p>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        <div className="space-y-4">
          {recentBookings?.map((booking) => (
            <Card key={booking.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{booking.serviceName}</h3>
                  <p className="text-gray-600">{booking.providerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${booking.amount}</p>
                  <p className="text-sm text-gray-600">{booking.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;