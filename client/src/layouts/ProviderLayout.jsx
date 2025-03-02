import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, ClipboardList, Briefcase, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '../utils/constants';

const ProviderLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: ROUTES.PROVIDER.DASHBOARD, label: 'Dashboard', icon: Home },
    { path: ROUTES.PROVIDER.SERVICES, label: 'Services', icon: Briefcase },
    { path: ROUTES.PROVIDER.BOOKINGS, label: 'Bookings', icon: ClipboardList },
    { path: ROUTES.PROVIDER.REQUESTS, label: 'Requests', icon: Bell },
    { path: ROUTES.PROVIDER.PROFILE, label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ProviderLayout;