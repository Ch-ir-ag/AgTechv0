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
  // Hard-coded credentials
  const LAKELAND_USERNAME = 'lakeland';
  const LAKELAND_PASSWORD = 'ld2025@';
  
  const KERRY_USERNAME = 'kerry';
  const KERRY_PASSWORD = 'ky2025!';
  
  const DAIRYGOLD_USERNAME = 'dairygold';
  const DAIRYGOLD_PASSWORD = 'dg2025#';
  
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
    
    // Check credentials for Kerry
    if (username === KERRY_USERNAME && password === KERRY_PASSWORD) {
      const newUser = { company: 'kerry-dairy', username: 'kerry' };
      setUser(newUser);
      localStorage.setItem('daisyUser', JSON.stringify(newUser));
      return true;
    }
    
    // Check credentials for Dairygold
    if (username === DAIRYGOLD_USERNAME && password === DAIRYGOLD_PASSWORD) {
      const newUser = { company: 'dairygold', username: 'dairygold' };
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