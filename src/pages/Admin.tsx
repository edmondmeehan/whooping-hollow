
import React from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminContent = () => {
  const { isAuthenticated, adminData, handleLogout } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar 
        onLogout={() => handleLogout(false)} 
        adminEmail={adminData?.email}
        adminName={adminData?.name}
        adminAvatar={adminData?.avatarUrl}
      />
      <AdminDashboard />
    </div>
  );
};

const Admin = () => {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
};

export default Admin;
