
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
    handleSubmit,
    formatTime
  } = useAdminAuthForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-hamptons-accent/10 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-hamptons-accent" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Sign in with your email and password to access the admin area
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
          handleSubmit={handleSubmit}
          isLocked={isLocked}
          formattedTime={formatTime(timeRemaining)}
        />
      </Card>
    </div>
  );
};

export default AdminLogin;
