// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  experience?: string;
  interests?: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  company?: string;
  experience?: string;
  interests?: string[];
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100
  targetLevel: number;
  learningHours: number;
  lastUpdated: string;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  match: number; // 0-100
  postedDate: string;
  description: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  enrolledCount: number;
  instructor: string;
  thumbnail: string;
}

// Dashboard Types
export interface DashboardStats {
  totalSkills: number;
  completedSkills: number;
  learningHours: number;
  averageProgress: number;
}

export interface SkillTrend {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  trend: 'up' | 'down' | 'stable';
}

// Market Data Types
export interface JobTrend {
  id: string;
  title: string;
  category: string;
  growth: number;
  demand: number;
  salary: {
    min: number;
    max: number;
    median: number;
  };
  skills: string[];
  location: string;
  postedDate: string;
  company: string;
}

export interface SalaryData {
  skill: string;
  experience: string;
  location: string;
  salary: {
    min: number;
    max: number;
    median: number;
    percentiles: {
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
  };
  demand: number;
  growth: number;
  lastUpdated: string;
}

export interface SkillDemand {
  skill: string;
  category: string;
  demand: number;
  growth: number;
  marketValue: number;
  jobCount: number;
  averageSalary: number;
  topCompanies: string[];
  trending: boolean;
  lastUpdated: string;
}

export interface MarketInsights {
  topSkills: SkillDemand[];
  trendingJobs: JobTrend[];
  salaryInsights: SalaryData[];
  marketOverview: {
    totalJobs: number;
    averageSalary: number;
    growthRate: number;
    topCategories: string[];
  };
}

// Skill Assessment Types
export interface SkillAssessment {
  id: string;
  skillId: string;
  skillName: string;
  category: string;
  questions: AssessmentQuestion[];
  timeLimit: number; // in minutes
  passingScore: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'coding' | 'scenario';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface AssessmentResult {
  id: string;
  skillId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in seconds
  completedAt: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  recommendations: string[];
}

export interface SkillRecommendation {
  skillId: string;
  skillName: string;
  category: string;
  confidence: number; // 0-100
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number; // in hours
  marketValue: number;
  relatedSkills: string[];
}

export interface SkillProgress {
  skillId: string;
  skillName: string;
  category: string;
  currentLevel: number; // 0-100
  targetLevel: number;
  learningHours: number;
  lastAssessment: AssessmentResult | null;
  nextAssessment: string;
  learningPath: LearningStep[];
  achievements: Achievement[];
}

export interface LearningStep {
  id: string;
  title: string;
  type: 'course' | 'project' | 'assessment' | 'practice';
  duration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  resources: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  points: number;
}

// API Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

// Toast Types
export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
} 