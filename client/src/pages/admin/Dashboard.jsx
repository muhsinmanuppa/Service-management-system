import { Analytics } from '@/components/admin';
import { Card } from '@/components/common';
import { useAuth } from '@/hooks';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <span className="text-gray-600">Welcome back, {user?.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Analytics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {/* Add RecentActivity component */}
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          {/* Add SystemStatus component */}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;