import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, Home, Users, Settings, Shield, Package, BarChart2, LogOut,
  Bell, Search
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get the current page title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('users')) return 'User Management';
    if (path.includes('providers')) return 'Provider Management';
    if (path.includes('services')) return 'Service Management';
    return 'Admin Portal';
  };

  const navItems = [
    { path: '/admin/dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/admin/users', icon: <Users className="w-5 h-5" />, label: 'Users' },
    { path: '/admin/providers', icon: <Shield className="w-5 h-5" />, label: 'Providers' },
    { path: '/admin/services', icon: <Package className="w-5 h-5" />, label: 'Services' },
    { path: '/admin/analytics', icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics' },
    { path: '/admin/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">Admin Portal</h1>
          <button 
            className="p-1 rounded-md text-gray-400 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="px-4 py-6">
          <div className="flex items-center space-x-3 py-4 mb-6 border-b border-gray-800">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-medium">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="font-medium text-white">{user?.name || 'Admin User'}</p>
              <p className="text-sm text-gray-400">{user?.role || 'Super Admin'}</p>
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
                      ? 'bg-indigo-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </NavLink>
            ))}
            
            <div className="pt-6 mt-6 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 mr-4 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-64 py-2 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  5
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;