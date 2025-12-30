import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email]) {
      throw new Error('User already exists');
    }
    users[email] = { name, password };
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[email] || users[email].password !== password) {
      throw new Error('Invalid email or password');
    }
    localStorage.setItem('jwt', 'mock-jwt-token');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('jwt');
    setIsAuthenticated(token === 'mock-jwt-token');
  };

  const value = {
    isAuthenticated,
    signup,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};