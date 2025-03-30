
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  AlertCircle,
  Camera, 
  UserRound
} from 'lucide-react';
import {
  AdminUser,
  getAdminUsers,
  addAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from '@/services/admin-users-storage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AdminUsersProps {
  currentUserEmail: string;
}

const DEFAULT_AVATAR_URLS = [
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&h=100',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=100&h=100',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=100&h=100',
  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=100&h=100',
];

const AdminUsers = ({ currentUserEmail }: AdminUsersProps) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  
  // Form states
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<'admin' | 'editor'>('editor');
  const [formAvatarUrl, setFormAvatarUrl] = useState('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  
  useEffect(() => {
    // Load admin users
    refreshUsers();
  }, []);
  
  const refreshUsers = () => {
    setUsers(getAdminUsers());
  };
  
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = addAdminUser(formEmail, formPassword, formName, formRole);
    
    if (success) {
      // If an avatar was selected, update the user with it
      if (formAvatarUrl) {
        updateAdminUser(formEmail, { avatarUrl: formAvatarUrl });
      }
      
      toast({
        title: 'Admin user added',
        description: `${formEmail} has been added as ${formRole}`,
      });
      refreshUsers();
      resetForm();
      setIsAddDialogOpen(false);
    } else {
      toast({
        title: 'Failed to add user',
        description: 'A user with this email already exists.',
        variant: 'destructive',
      });
    }
  };
  
  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    const updates: Partial<AdminUser> = {
      name: formName,
      role: formRole,
    };
    
    // Only update password if provided
    if (formPassword) {
      (updates as any).password = formPassword;
    }
    
    // Only update avatar if changed
    if (formAvatarUrl && formAvatarUrl !== selectedUser.avatarUrl) {
      updates.avatarUrl = formAvatarUrl;
    }
    
    const success = updateAdminUser(selectedUser.email, updates);
    
    if (success) {
      toast({
        title: 'Admin user updated',
        description: `${selectedUser.email} has been updated`,
      });
      refreshUsers();
      resetForm();
      setIsEditDialogOpen(false);
    } else {
      toast({
        title: 'Failed to update user',
        description: 'User not found.',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    const success = deleteAdminUser(selectedUser.email);
    
    if (success) {
      toast({
        title: 'Admin user deleted',
        description: `${selectedUser.email} has been removed`,
      });
      refreshUsers();
      setIsDeleteDialogOpen(false);
    } else {
      toast({
        title: 'Failed to delete user',
        description: 'Cannot delete the last admin user.',
        variant: 'destructive',
      });
    }
  };
  
  const handleUpdateAvatar = () => {
    if (!selectedUser) return;
    
    let avatarUrl = customAvatarUrl;
    
    // If custom URL is empty, use the selected default
    if (!customAvatarUrl && formAvatarUrl) {
      avatarUrl = formAvatarUrl;
    }
    
    if (!avatarUrl) {
      toast({
        title: 'No avatar selected',
        description: 'Please select or enter an avatar URL',
        variant: 'destructive',
      });
      return;
    }
    
    const success = updateAdminUser(selectedUser.email, { avatarUrl });
    
    if (success) {
      toast({
        title: 'Avatar updated',
        description: `Profile picture updated successfully`,
      });
      refreshUsers();
      setIsAvatarDialogOpen(false);
      setCustomAvatarUrl('');
    } else {
      toast({
        title: 'Failed to update avatar',
        description: 'User not found.',
        variant: 'destructive',
      });
    }
  };
  
  const resetForm = () => {
    setFormEmail('');
    setFormPassword('');
    setFormName('');
    setFormRole('editor');
    setFormAvatarUrl('');
    setCustomAvatarUrl('');
  };
  
  const openEditDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setFormEmail(user.email);
    setFormName(user.name || '');
    setFormRole(user.role);
    setFormAvatarUrl(user.avatarUrl || '');
    setFormPassword(''); // Don't set password - will only update if provided
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  const openAvatarDialog = (user: AdminUser) => {
    setSelectedUser(user);
    setFormAvatarUrl(user.avatarUrl || '');
    setIsAvatarDialogOpen(true);
  };
  
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin User Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              <span>Add Admin User</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddUser}>
              <DialogHeader>
                <DialogTitle>Add New Admin User</DialogTitle>
                <DialogDescription>
                  Create a new admin user with specific permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name (Optional)</Label>
                  <Input
                    id="name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formRole}
                    onValueChange={(value) => setFormRole(value as 'admin' | 'editor')}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Profile Picture (Optional)</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {DEFAULT_AVATAR_URLS.map((url, index) => (
                      <div 
                        key={index}
                        onClick={() => setFormAvatarUrl(url)}
                        className={`cursor-pointer p-1 rounded-md ${formAvatarUrl === url ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={url} alt={`Avatar option ${index + 1}`} />
                        </Avatar>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            Manage users who can access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No admin users found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {user.avatarUrl ? (
                            <AvatarImage src={user.avatarUrl} alt={user.name || user.email} />
                          ) : (
                            <AvatarFallback className="bg-gray-200 text-gray-700">
                              {(user.name || user.email).charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <div>{user.email}</div>
                          {user.name && <div className="text-xs text-gray-500">{user.name}</div>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        user.role === 'admin' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'admin' ? 'Administrator' : 'Editor'}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(user.lastLogin)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openAvatarDialog(user)}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(user)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => openDeleteDialog(user)}
                          disabled={user.email === currentUserEmail}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {users.length === 1 && (
            <Alert className="mt-4 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                At least one admin user is required. You cannot delete the last admin.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <form onSubmit={handleEditUser}>
            <DialogHeader>
              <DialogTitle>Edit Admin User</DialogTitle>
              <DialogDescription>
                Update the details for {selectedUser?.email}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-password">
                  Password <span className="text-sm text-muted-foreground">(leave blank to keep current)</span>
                </Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={formRole}
                  onValueChange={(value) => setFormRole(value as 'admin' | 'editor')}
                  disabled={selectedUser?.email === currentUserEmail}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                {selectedUser?.email === currentUserEmail && (
                  <p className="text-xs text-muted-foreground">
                    You cannot change your own role.
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.email}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Avatar Selection Dialog */}
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Choose a profile picture for {selectedUser?.email}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-2">
              <Avatar className="h-20 w-20">
                {formAvatarUrl || selectedUser?.avatarUrl ? (
                  <AvatarImage 
                    src={formAvatarUrl || selectedUser?.avatarUrl} 
                    alt={selectedUser?.name || selectedUser?.email || 'Profile'} 
                  />
                ) : (
                  <AvatarFallback className="text-2xl">
                    <UserRound className="h-10 w-10" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div className="space-y-2">
              <Label>Select from default avatars</Label>
              <div className="grid grid-cols-5 gap-2">
                {DEFAULT_AVATAR_URLS.map((url, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      setFormAvatarUrl(url);
                      setCustomAvatarUrl('');
                    }}
                    className={`cursor-pointer p-1 rounded-md ${formAvatarUrl === url ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={url} alt={`Avatar option ${index + 1}`} />
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-avatar-url">Or enter custom image URL</Label>
              <Input
                id="custom-avatar-url"
                placeholder="https://example.com/your-image.jpg"
                value={customAvatarUrl}
                onChange={(e) => {
                  setCustomAvatarUrl(e.target.value);
                  setFormAvatarUrl('');
                }}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAvatar}>
              Update Avatar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
