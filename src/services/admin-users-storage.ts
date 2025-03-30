
// This file manages admin users in local storage

export interface AdminUser {
  email: string;
  passwordHash: string;
  name?: string;
  role: 'admin' | 'editor';
  lastLogin?: string;
}

const STORAGE_KEY = 'whh_admin_users';

// Simple password hashing for demo purposes
// In production, use a proper hashing library
export const hashPassword = (password: string): string => {
  // This is NOT secure - only for demo purposes
  return btoa(password + '_salt_123');
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

// Initialize default admin if no admins exist
const initializeDefaultAdmin = (): void => {
  const users = getAdminUsers();
  if (users.length === 0) {
    const defaultAdmin: AdminUser = {
      email: 'eddie@please.co',
      passwordHash: hashPassword('brickhouse5150'),
      name: 'Eddie',
      role: 'admin',
    };
    saveAdminUsers([defaultAdmin]);
  }
};

export const getAdminUsers = (): AdminUser[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing admin users', e);
    return [];
  }
};

export const saveAdminUsers = (users: AdminUser[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const findAdminByEmail = (email: string): AdminUser | undefined => {
  const users = getAdminUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const authenticateAdmin = (email: string, password: string): AdminUser | null => {
  const user = findAdminByEmail(email);
  if (!user) return null;
  
  if (verifyPassword(password, user.passwordHash)) {
    // Update last login time
    const users = getAdminUsers();
    const updatedUsers = users.map(u => 
      u.email === email ? { ...u, lastLogin: new Date().toISOString() } : u
    );
    saveAdminUsers(updatedUsers);
    return user;
  }
  
  return null;
};

export const addAdminUser = (email: string, password: string, name?: string, role: 'admin' | 'editor' = 'editor'): boolean => {
  const users = getAdminUsers();
  
  // Check if user already exists
  if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    return false;
  }
  
  const newUser: AdminUser = {
    email,
    passwordHash: hashPassword(password),
    name,
    role,
    lastLogin: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveAdminUsers(users);
  return true;
};

export const updateAdminUser = (email: string, updates: Partial<AdminUser>): boolean => {
  const users = getAdminUsers();
  const index = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (index === -1) return false;
  
  // Don't allow email changes through this method for simplicity
  const { email: _, ...allowedUpdates } = updates;
  
  // Update password if provided
  if ('password' in updates && typeof updates.password === 'string') {
    allowedUpdates.passwordHash = hashPassword(updates.password as string);
    delete (allowedUpdates as any).password;
  }
  
  users[index] = { ...users[index], ...allowedUpdates };
  saveAdminUsers(users);
  return true;
};

export const deleteAdminUser = (email: string): boolean => {
  const users = getAdminUsers();
  
  // Don't allow deleting the last admin
  if (users.length <= 1) return false;
  
  const filteredUsers = users.filter(user => user.email.toLowerCase() !== email.toLowerCase());
  
  // If no users were removed, return false
  if (filteredUsers.length === users.length) return false;
  
  saveAdminUsers(filteredUsers);
  return true;
};

// Initialize the admin users when this module is imported
initializeDefaultAdmin();
