import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { username: string; role: string } | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  const login = async (username: string, password: string) => {
    // Implement login logic here
    // On success, set the user state
    setUser({ username, role: 'Admin' }); // Example role, replace with actual logic
  };

  const register = async (username: string, password: string, role: string) => {
    // Implement registration logic here
    // On success, set the user state
    setUser({ username, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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