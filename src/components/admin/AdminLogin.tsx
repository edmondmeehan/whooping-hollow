
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAdminAuthForm } from '@/hooks/use-admin-auth-form';
import AdminLockoutAlert from './auth/AdminLockoutAlert';
import AdminLoginForm from './auth/AdminLoginForm';

const AdminLogin = () => {
  const {
    email,
    setEmail,
    isLocked,
    timeRemaining,
    isLoadingMagicLink,
    handleMagicLinkLogin,
    formatTime
  } = useAdminAuthForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg px-5 py-12 text-admin-ink">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 text-center">
          <p className="text-3xl font-extrabold uppercase text-admin-ink sm:text-4xl">Whooping Hollow</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-admin-line" />
            <p className="text-[10px] font-bold uppercase text-admin-muted">Admin Portal</p>
            <span className="h-px w-8 bg-admin-line" />
          </div>
        </div>
        <div className="border border-admin-line bg-admin-surface p-7 sm:p-10">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-admin-ink">Sign in</h1>
            <p className="mt-2 text-sm leading-relaxed text-admin-muted">Enter your email and we’ll send you a secure login link.</p>
          </div>
        {isLocked && (
          <AdminLockoutAlert formattedTime={formatTime(timeRemaining)} />
        )}
        
        <AdminLoginForm
          email={email}
          setEmail={setEmail}
          handleMagicLinkLogin={handleMagicLinkLogin}
          isLocked={isLocked}
          isLoadingMagicLink={isLoadingMagicLink}
        />
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase text-admin-muted transition-colors hover:text-admin-ink">
            Return to site <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
