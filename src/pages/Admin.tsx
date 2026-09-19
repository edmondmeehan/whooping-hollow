
import React from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminContent = () => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="admin-shell min-h-screen bg-admin-bg font-display text-admin-ink">
      <AdminDashboard />
    </div>
  );
};

const Admin = () => {
  return (
    <div className="admin-shell font-display">
      <AdminAuthProvider>
        <AdminContent />
      </AdminAuthProvider>
    </div>
  );
};

export default Admin;
