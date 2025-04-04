'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
interface User {
  company: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  // Hard-coded credentials for Lakeland Dairies
  const LAKELAND_USERNAME = 'lakeland';
  const LAKELAND_PASSWORD = 'dairy2023';
  
  const [user, setUser] = useState<User | null>(null);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('daisyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = (username: string, password: string): boolean => {
    // Check credentials for Lakeland
    if (username === LAKELAND_USERNAME && password === LAKELAND_PASSWORD) {
      const newUser = { company: 'lakeland-dairies', username: 'lakeland' };
      setUser(newUser);
      localStorage.setItem('daisyUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('daisyUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext); 