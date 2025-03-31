
import React from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminContent = () => {
  const { isAuthenticated, adminData, handleLogout } = useAdminAuth();
  const isMobile = useIsMobile();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6 md:pb-12">
      <AdminNavbar 
        onLogout={() => handleLogout(false)} 
        adminEmail={adminData?.email}
        adminName={adminData?.name}
        adminAvatar={adminData?.avatarUrl}
      />
      <div className={isMobile ? "px-2" : ""}>
        <AdminDashboard />
      </div>
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
