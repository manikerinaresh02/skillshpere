import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  company?: string;
  jobTitle?: string;
  experience?: string;
  interests?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  username: string;
  jobTitle?: string;
  company?: string;
  experience?: string;
  interests?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setError: (error: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('Login attempt with credentials:', credentials);
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials - only allow demo credentials
      if (credentials.email === 'demo@skillsphere.com' && credentials.password === 'demo123') {
        console.log('Login successful with demo credentials');
        // Mock successful login
        const mockUser: User = {
          id: '1',
          firstName: 'Alex',
          lastName: 'Chen',
          email: credentials.email,
          username: 'alexchen',
          role: 'Senior Developer',
          company: 'TechCorp',
          jobTitle: 'Senior Developer',
          experience: '5 years',
          interests: 'Full Stack Development',
          avatar: '/placeholder.svg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
      } else {
        console.log('Login failed - invalid credentials');
        // Invalid credentials - set error and throw
        const errorMessage = 'Invalid credentials. Please try again.';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      // The error is already set in the else block, so we don't need to set it again
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      console.log('Registration started with data:', userData);
      setIsLoading(true);
      setError(null);
      
      // Validate password confirmation
      if (userData.password !== userData.confirmPassword) {
        const errorMessage = 'Passwords do not match. Please try again.';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      const mockUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        role: userData.jobTitle || 'Developer',
        company: userData.company,
        jobTitle: userData.jobTitle,
        experience: userData.experience,
        interests: userData.interests,
        avatar: '/placeholder.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      console.log('Registration successful, setting user:', mockUser);
      setUser(mockUser);
    } catch (error) {
      console.error('Registration error:', error);
      // Set error message if not already set
      if (!error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed';
        setError(errorMessage);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 