const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Active Providers</h3>
          <p className="text-3xl font-bold">567</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-3xl font-bold">8,901</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-3xl font-bold">$123,456</p>
        </div>
      </div>
      
      {/* Add charts and graphs here */}
    </div>
  );
};

export default Analytics;
