import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Signup function
  const signup = (email, password, name) => {
    // Get existing users or create empty array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      toast.error('User already exists with this email');
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In real app, this should be hashed
      name: name || email.split('@')[0],
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set as current user (without password)
    const { password: pwd, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    toast.success('Account created successfully!');
    return true;
  };

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Demo account for easy testing
    if (email === 'demo@student.com' && password === 'demo123') {
      const demoUser = {
        id: 'demo123',
        email: 'demo@student.com',
        name: 'Demo User',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      toast.success('Logged in successfully!');
      return true;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: pwd, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success('Logged in successfully!');
      return true;
    } else {
      toast.error('Invalid email or password');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
  };

  // Update user profile
  const updateProfile = (updates) => {
    if (!currentUser) return false;

    // Update in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      
      // Update current user
      const { password: pwd, ...userWithoutPassword } = updatedUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      toast.success('Profile updated successfully!');
      return true;
    }
    return false;
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}