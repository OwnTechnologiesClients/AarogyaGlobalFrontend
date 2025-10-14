'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { signOut as firebaseSignOut } from '@/lib/firebase/auth';
import apiService from '@/lib/apiService';
import Swal from 'sweetalert2';

const AuthContext = createContext({});

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * Auth Provider Component
 * Wraps the app and provides authentication state
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Backend user data
  const [firebaseUser, setFirebaseUser] = useState(null); // Firebase user
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Custom JWT from backend

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Firebase auth state changed:', firebaseUser ? 'Logged in' : 'Logged out');
      
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // User is signed in with Firebase
        // Get stored backend token and user data
        const storedToken = localStorage.getItem('userToken');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          try {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error('Error parsing stored user data:', error);
            // Clear invalid data
            localStorage.removeItem('userToken');
            localStorage.removeItem('user');
          }
        }
      } else {
        // User is signed out
        setUser(null);
        setToken(null);
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  /**
   * Login user - called after successful Firebase authentication
   * @param {Object} userData - User data from backend
   * @param {string} authToken - JWT token from backend
   */
  const loginUser = (userData, authToken) => {
    console.log('Logging in user:', userData.email || userData.phoneNumber);
    
    setUser(userData);
    setToken(authToken);
    
    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userToken', authToken);
  };

  /**
   * Logout user - signs out from Firebase and clears local state
   */
  const logout = async () => {
    try {
      console.log('Logging out user...');
      
      // Sign out from Firebase
      await firebaseSignOut();
      
      // Clear local state
      setUser(null);
      setToken(null);
      setFirebaseUser(null);
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      
      // Show logout success message with SweetAlert
      Swal.fire({
        title: 'Logged Out Successfully!',
        text: 'You have been logged out of your account.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        background: '#10b981',
        color: '#ffffff',
        iconColor: '#ffffff'
      });
      
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  /**
   * Update user data in state and localStorage
   * @param {Object} updatedUser - Updated user data
   */
  const updateUser = (updatedUser) => {
    const newUserData = { ...user, ...updatedUser };
    setUser(newUserData);
    localStorage.setItem('user', JSON.stringify(newUserData));
  };

  /**
   * Refresh token - can be called when token is about to expire
   */
  const refreshToken = async () => {
    try {
      if (!token) {
        throw new Error('No token to refresh');
      }

      const data = await apiService.request('/user-auth/refresh-token', {
        method: 'POST',
        includeAuth: true
      });

      if (data.success && data.data.token) {
        setToken(data.data.token);
        localStorage.setItem('userToken', data.data.token);
        return data.data.token;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  const value = {
    user,              // Backend user data
    firebaseUser,      // Firebase user object
    token,             // Custom JWT token
    loading,           // Loading state
    isAuthenticated: !!user && !!token && !!firebaseUser,
    loginUser,         // Function to login user
    logout,            // Function to logout user
    updateUser,        // Function to update user data
    refreshToken       // Function to refresh JWT token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

