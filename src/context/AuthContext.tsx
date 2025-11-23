import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'passenger' | 'driver' | null;

interface User {
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('go_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user', error);
      }
    }
  }, []);

  const login = (role: UserRole) => {
    // Mock login
    const newUser: User = {
      name: role === 'passenger' ? 'Talha Khalid' : 'Driver Mike',
      email: role === 'passenger' ? 'khalidtalha00@gmail.com' : 'mike@driver.com',
      role: role,
    };
    setUser(newUser);
    localStorage.setItem('go_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('go_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('go_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
