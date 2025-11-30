
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Users, Shield, Database } from 'lucide-react';

interface AdminUsersProps {
  currentUserEmail: string;
}

const AdminUsers = ({ currentUserEmail }: AdminUsersProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Admin User Management</h2>
        <p className="text-muted-foreground">
          Manage admin users and roles through Supabase
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Secure Authentication:</strong> This application now uses Supabase Auth for user management.
          Admin users are managed through the Supabase dashboard for enhanced security.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-hamptons-accent" />
              <CardTitle>Manage Users</CardTitle>
            </div>
            <CardDescription>
              View and manage all authenticated users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create, edit, and delete user accounts. Manage email verification and password resets.
            </p>
            <Button 
              className="w-full"
              onClick={() => window.open('https://supabase.com/dashboard/project/cpryayfndzfeyfrnsesr/auth/users', '_blank')}
            >
              Open User Management
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-hamptons-accent" />
              <CardTitle>Manage Roles</CardTitle>
            </div>
            <CardDescription>
              Assign admin roles to users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use the SQL Editor to grant or revoke admin roles from the user_roles table.
            </p>
            <Button 
              className="w-full"
              onClick={() => window.open('https://supabase.com/dashboard/project/cpryayfndzfeyfrnsesr/sql/new', '_blank')}
            >
              Open SQL Editor
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Quick SQL Commands</CardTitle>
          <CardDescription>
            Use these commands in the SQL Editor to manage admin roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Grant Admin Role:</h4>
            <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'user@example.com';`}
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Revoke Admin Role:</h4>
            <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto">
{`DELETE FROM user_roles
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'user@example.com'
)
AND role = 'admin';`}
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">View All Admin Users:</h4>
            <pre className="bg-gray-900 text-blue-400 p-3 rounded text-xs overflow-x-auto">
{`SELECT u.email, u.created_at, ur.role
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin'
ORDER BY u.created_at DESC;`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          <strong>Current User:</strong> {currentUserEmail}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AdminUsers;
