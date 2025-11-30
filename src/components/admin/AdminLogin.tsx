
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { useAdminAuthForm } from '@/hooks/use-admin-auth-form';
import AdminLockoutAlert from './auth/AdminLockoutAlert';
import AdminWarningAlert from './auth/AdminWarningAlert';
import AdminLoginForm from './auth/AdminLoginForm';

const AdminLogin = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    failedAttempts,
    isLocked,
    timeRemaining,
    isLoadingMagicLink,
    handlePasswordLogin,
    handleMagicLinkLogin,
    formatTime
  } = useAdminAuthForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-[var(--shadow-elegant)] border-border">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl font-serif">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Sign in with your email and password, or use a magic link
          </CardDescription>
        </CardHeader>
        
        {isLocked && (
          <AdminLockoutAlert formattedTime={formatTime(timeRemaining)} />
        )}
        
        {!isLocked && failedAttempts > 0 && (
          <AdminWarningAlert attemptsRemaining={3 - failedAttempts} />
        )}
        
        <AdminLoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handlePasswordLogin={handlePasswordLogin}
          handleMagicLinkLogin={handleMagicLinkLogin}
          isLocked={isLocked}
          isLoadingMagicLink={isLoadingMagicLink}
          formattedTime={formatTime(timeRemaining)}
        />
      </Card>
    </div>
  );
};

export default AdminLogin;
