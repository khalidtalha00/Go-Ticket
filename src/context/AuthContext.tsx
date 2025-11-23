import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'passenger' | 'driver' | null;

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    // Mock login
    setUser({
      name: role === 'passenger' ? 'Talha Khalid' : 'Driver Mike',
      email: role === 'passenger' ? 'khalidtalha00@gmail.com' : 'mike@driver.com',
      role: role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
