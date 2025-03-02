import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; // Ensure correct path
import PrivateRoute from './utils/PrivateRoute';
import { ROUTES } from './utils/constants';

// Layouts
import ClientLayout from './layouts/ClientLayout';
import ProviderLayout from './layouts/ProviderLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import ClientServices from './pages/client/Services';
import ClientBookings from './pages/client/Bookings';
import ClientProfile from './pages/client/Profile';

// Provider Pages
import ProviderDashboard from './pages/provider/Dashboard';
import ProviderServices from './pages/provider/Services';
import ProviderBookings from './pages/provider/Bookings';
import ProviderProfile from './pages/provider/Profile';
import Requests from './pages/provider/Requests'; // Ensure correct path
import Services from './pages/provider/Services'; // Ensure correct path

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminServices from './pages/admin/Services';
import AdminProviders from './pages/admin/Providers';

// Enhanced Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-xl font-semibold">Loading, please wait...</div>
  </div>
);

// Component to handle root path redirection
const RootRedirect = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  switch (user.role) {
    case 'admin':
      return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    case 'provider':
      return <Navigate to={ROUTES.PROVIDER.DASHBOARD} replace />;
    default:
      return <Navigate to={ROUTES.CLIENT.DASHBOARD} replace />;
  }
};

const AppRoutes = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Client Routes */}
        <Route
          path={ROUTES.CLIENT.ROOT}
          element={
            <PrivateRoute allowedRoles={['client']}>
              <ClientLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="services" element={<ClientServices />} />
          <Route path="bookings" element={<ClientBookings />} />
          <Route path="profile" element={<ClientProfile />} />
        </Route>

        {/* Provider Routes */}
        <Route
          path={ROUTES.PROVIDER.ROOT}
          element={
            <PrivateRoute allowedRoles={['provider']}>
              <ProviderLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="bookings" element={<ProviderBookings />} />
          <Route path="profile" element={<ProviderProfile />} />
          <Route path="requests" element={<Requests />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path={ROUTES.ADMIN.ROOT}
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="providers" element={<AdminProviders />} />
        </Route>

        {/* Unauthorized Route */}
        <Route path={ROUTES.UNAUTHORIZED} element={<div>Unauthorized Access</div>} />

        {/* Redirect root to appropriate dashboard based on user role */}
        <Route path={ROUTES.HOME} element={<RootRedirect />} />

        {/* Fallback for unknown routes */}
        {/* <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
