import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Calendar, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ClientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/client/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/client/services', icon: <Search className="w-5 h-5" />, label: 'Find Services' },
    { path: '/client/bookings', icon: <Calendar className="w-5 h-5" />, label: 'My Bookings' },
    { path: '/client/profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-6 border-b">
          <h1 className="text-xl font-bold text-indigo-600">Service Platform</h1>
          <button 
            className="p-1 rounded-md lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="px-4 py-2">
          <div className="flex items-center space-x-3 py-4 mb-4 border-b">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">
                {user?.name?.charAt(0) || 'C'}
              </span>
            </div>
            <div>
              <p className="font-medium">{user?.name || 'Client User'}</p>
              <p className="text-sm text-gray-500">{user?.email || 'client@example.com'}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </NavLink>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 mt-4 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 rounded-md focus:outline-none focus:ring"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-indigo-600">Service Platform</h1>
            <div className="w-6"></div> {/* Spacer for layout balance */}
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;