// Mock authentication service
import { User, LoginCredentials, RegisterData } from '../types';

export const authService = {
  tokenKey: 'skillsphere_token',
  userKey: 'skillsphere_user',

  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  },

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  },

  // Remove token from localStorage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  },

  // Store user in localStorage
  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  },

  // Get user from localStorage
  getUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Remove user from localStorage
  removeUser(): void {
    localStorage.removeItem(this.userKey);
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Alex Chen',
        email: credentials.email,
        role: 'Senior Developer',
        company: 'TechCorp',
        experience: '5 years',
        interests: ['Full Stack Development', 'React', 'Node.js'],
        avatar: '/placeholder.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      
      this.setToken(mockToken);
      this.setUser(mockUser);

      return mockUser;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  // Register user
  async register(userData: RegisterData): Promise<User> {
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock successful registration
      const mockUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'Developer',
        company: userData.company,
        experience: userData.experience,
        interests: userData.interests,
        avatar: '/placeholder.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      
      this.setToken(mockToken);
      this.setUser(mockUser);

      return mockUser;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  },

  // Logout user
  logout(): void {
    this.removeToken();
    this.removeUser();
  },

  // Get current user
  getCurrentUser(): User | null {
    return this.getUser();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}; 