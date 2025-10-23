import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { User, LoginCredentials, RegisterData } from '@/types';

interface SupabaseProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  job_title: string | null;
  company: string | null;
  experience: string | null;
  interests: string | null;
  avatar: string | null;
}

// Helper function to convert Supabase profile to User type
const profileToUser = (profile: SupabaseProfile, email: string): User => {
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'User';
  return {
    id: profile.id,
    name: fullName,
    email,
    role: profile.job_title || 'User',
    company: profile.company || undefined,
    experience: profile.experience || undefined,
    interests: profile.interests ? profile.interests.split(',').map(i => i.trim()) : undefined,
    avatar: profile.avatar || undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Fetch profile data
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (profile) {
              setUser(profileToUser(profile, currentSession.user.email!));
            }
          }, 0);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Fetch profile data
        supabase
          .from('profiles')
          .select('*')
          .eq('id', currentSession.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              setUser(profileToUser(profile, currentSession.user.email!));
            }
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (signInError) {
        setError(signInError.message);
        throw signInError;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate password confirmation
      if (userData.password !== userData.confirmPassword) {
        const errorMessage = 'Passwords do not match';
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const nameParts = userData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const { error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
            username: userData.email.split('@')[0],
            job_title: userData.role || 'User',
            company: userData.company,
            experience: userData.experience,
            interests: userData.interests ? userData.interests.join(',') : null,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        throw signUpError;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const isAuthenticated = !!user && !!session;

  const value: AuthContextType = {
    user,
    session,
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