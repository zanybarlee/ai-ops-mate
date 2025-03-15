
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

// Define user roles
export type UserRole = 'admin' | 'engineer' | 'support' | 'viewer';

// Define user interface
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

// Mock users for demonstration
const MOCK_USERS: UserData[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@aiops.com',
    role: 'admin',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: '2',
    name: 'Engineer User',
    email: 'engineer@aiops.com',
    role: 'engineer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=engineer'
  },
  {
    id: '3',
    name: 'Support User',
    email: 'support@aiops.com',
    role: 'support',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=support'
  },
  {
    id: '4',
    name: 'Viewer User',
    email: 'viewer@aiops.com',
    role: 'viewer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viewer'
  }
];

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  availableUsers: UserData[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  
  // Check if there's a saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userId: string) => {
    const selectedUser = MOCK_USERS.find(u => u.id === userId) || null;
    if (selectedUser) {
      setUser(selectedUser);
      localStorage.setItem('currentUser', JSON.stringify(selectedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      availableUsers: MOCK_USERS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const UserAvatar = ({ user }: { user: UserData }) => {
  return (
    <Avatar className="border-2 border-primary/10">
      {user.avatarUrl ? (
        <AvatarImage src={user.avatarUrl} alt={user.name} />
      ) : (
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};
