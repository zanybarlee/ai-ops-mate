
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, HardHat, Headset, BookText, AlertTriangle } from 'lucide-react';

// Define user roles
export type UserRole = 'admin' | 'engineer' | 'support' | 'viewer' | 'technician' | 'tech_support' | 'system_admin' | 'maintenance_manager';

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
  },
  {
    id: '5',
    name: 'Data Center Technician',
    email: 'technician@aiops.com',
    role: 'technician',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=technician'
  },
  {
    id: '6',
    name: 'Tech Support Staff',
    email: 'techsupport@aiops.com',
    role: 'tech_support',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techsupport'
  },
  {
    id: '7',
    name: 'System Administrator',
    email: 'sysadmin@aiops.com',
    role: 'system_admin',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sysadmin'
  },
  {
    id: '8',
    name: 'Maintenance Manager',
    email: 'maintenance@aiops.com',
    role: 'maintenance_manager',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maintenance'
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

// Helper function to get role icon
export const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case 'technician':
      return <HardHat className="h-4 w-4" />;
    case 'tech_support':
      return <Headset className="h-4 w-4" />;
    case 'system_admin':
      return <BookText className="h-4 w-4" />;
    case 'maintenance_manager':
      return <AlertTriangle className="h-4 w-4" />;
    case 'admin':
      return <User className="h-4 w-4" />;
    case 'engineer':
      return <User className="h-4 w-4" />;
    case 'support':
      return <User className="h-4 w-4" />;
    case 'viewer':
      return <User className="h-4 w-4" />;
    default:
      return <User className="h-4 w-4" />;
  }
};

// Helper function to get role display name
export const getRoleDisplayName = (role: UserRole) => {
  switch (role) {
    case 'tech_support':
      return 'Tech Support';
    case 'system_admin':
      return 'System Admin';
    case 'maintenance_manager':
      return 'Maintenance Manager';
    default:
      return role.charAt(0).toUpperCase() + role.slice(1);
  }
};
