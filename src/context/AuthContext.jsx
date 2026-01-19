// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const signup = (name, email, password) => {
//     const users = JSON.parse(localStorage.getItem('users')) || {};
//     if (users[email]) {
//       throw new Error('User already exists');
//     }
//     users[email] = { name, password };
//     localStorage.setItem('users', JSON.stringify(users));
//   };

//   const login = (email, password) => {
//     const users = JSON.parse(localStorage.getItem('users')) || {};
//     if (!users[email] || users[email].password !== password) {
//       throw new Error('Invalid email or password');
//     }
//     localStorage.setItem('jwt', 'mock-jwt-token');
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('jwt');
//     setIsAuthenticated(false);
//   };

//   const checkAuth = () => {
//     const token = localStorage.getItem('jwt');
//     setIsAuthenticated(token === 'mock-jwt-token');
//   };

//   const value = {
//     isAuthenticated,
//     signup,
//     login,
//     logout,
//     checkAuth
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const data = await authAPI.register(name, email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
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