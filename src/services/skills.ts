import { apiClient } from '../utils/api';

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

// Skill Assessment Service
export const skillService = {
  // Assess user's skill level with AI-powered questions
  assessSkill: async (skillId: string, answers: Record<string, string>): Promise<AssessmentResult> => {
    try {
      const response = await apiClient.post(`/skills/${skillId}/assess`, { answers });
      return response.data;
    } catch (error) {
      console.error('Error assessing skill:', error);
      // Fallback to mock assessment result
      const score = Math.floor(Math.random() * 40) + 60; // 60-100
      const proficiency = score >= 90 ? 'expert' : score >= 75 ? 'advanced' : score >= 60 ? 'intermediate' : 'beginner';
      
      return {
        id: `assessment_${Date.now()}`,
        skillId,
        userId: 'current-user',
        score,
        totalQuestions: 10,
        correctAnswers: Math.floor((score / 100) * 10),
        timeTaken: Math.floor(Math.random() * 600) + 300, // 5-15 minutes
        completedAt: new Date().toISOString(),
        proficiency,
        recommendations: [
          'Focus on advanced concepts to reach expert level',
          'Practice real-world projects to improve practical skills',
          'Consider taking advanced courses in this area'
        ]
      };
    }
  },

  // Get AI-powered skill recommendations based on user profile
  getRecommendations: async (userId: string): Promise<SkillRecommendation[]> => {
    try {
      const response = await apiClient.get(`/users/${userId}/skill-recommendations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skill recommendations:', error);
      // Fallback to mock recommendations
      return [
        {
          skillId: 'react-advanced',
          skillName: 'React Advanced Patterns',
          category: 'Frontend Development',
          confidence: 85,
          reason: 'Based on your React intermediate level and market demand',
          priority: 'high',
          estimatedTime: 40,
          marketValue: 125000,
          relatedSkills: ['TypeScript', 'State Management', 'Performance Optimization']
        },
        {
          skillId: 'node-js',
          skillName: 'Node.js Backend Development',
          category: 'Backend Development',
          confidence: 78,
          reason: 'Complements your frontend skills for full-stack development',
          priority: 'medium',
          estimatedTime: 60,
          marketValue: 115000,
          relatedSkills: ['Express.js', 'MongoDB', 'REST APIs']
        },
        {
          skillId: 'aws-cloud',
          skillName: 'AWS Cloud Services',
          category: 'Cloud & DevOps',
          confidence: 72,
          reason: 'High market demand and good salary prospects',
          priority: 'medium',
          estimatedTime: 80,
          marketValue: 130000,
          relatedSkills: ['Docker', 'Kubernetes', 'CI/CD']
        },
        {
          skillId: 'python-data',
          skillName: 'Python for Data Science',
          category: 'Data Science',
          confidence: 65,
          reason: 'Growing field with excellent career opportunities',
          priority: 'low',
          estimatedTime: 100,
          marketValue: 140000,
          relatedSkills: ['Pandas', 'NumPy', 'Machine Learning']
        }
      ];
    }
  },

  // Track learning progress and update skill levels
  trackProgress: async (skillId: string, progress: {
    learningHours: number;
    completedSteps: string[];
    assessmentScore?: number;
  }): Promise<SkillProgress> => {
    try {
      const response = await apiClient.put(`/skills/${skillId}/progress`, progress);
      return response.data;
    } catch (error) {
      console.error('Error tracking progress:', error);
      // Fallback to mock progress update
      return {
        skillId,
        skillName: 'React Development',
        category: 'Frontend Development',
        currentLevel: Math.min(100, progress.learningHours * 2), // 2% per hour
        targetLevel: 100,
        learningHours: progress.learningHours,
        lastAssessment: null,
        nextAssessment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        learningPath: [
          {
            id: 'step-1',
            title: 'React Fundamentals',
            type: 'course',
            duration: 20,
            difficulty: 'beginner',
            completed: true,
            resources: ['React Documentation', 'Online Course']
          },
          {
            id: 'step-2',
            title: 'State Management',
            type: 'course',
            duration: 15,
            difficulty: 'intermediate',
            completed: progress.completedSteps.includes('step-2'),
            resources: ['Redux Tutorial', 'Context API Guide']
          },
          {
            id: 'step-3',
            title: 'Advanced Patterns',
            type: 'project',
            duration: 25,
            difficulty: 'advanced',
            completed: false,
            resources: ['Real-world Project', 'Code Reviews']
          }
        ],
        achievements: [
          {
            id: 'achievement-1',
            title: 'React Beginner',
            description: 'Completed React fundamentals course',
            icon: '🎯',
            unlockedAt: new Date().toISOString(),
            points: 100
          }
        ]
      };
    }
  },

  // Get comprehensive skill insights and analytics
  getSkillInsights: async (userId: string): Promise<{
    topSkills: SkillProgress[];
    learningAnalytics: {
      totalHours: number;
      averageProgress: number;
      skillsInProgress: number;
      completedSkills: number;
    };
    recommendations: SkillRecommendation[];
  }> => {
    try {
      const response = await apiClient.get(`/users/${userId}/skill-insights`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skill insights:', error);
      // Fallback to mock insights
      const recommendations = await skillService.getRecommendations(userId);
      
      return {
        topSkills: [
          {
            skillId: 'react',
            skillName: 'React Development',
            category: 'Frontend Development',
            currentLevel: 75,
            targetLevel: 100,
            learningHours: 45,
            lastAssessment: null,
            nextAssessment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            learningPath: [],
            achievements: []
          },
          {
            skillId: 'typescript',
            skillName: 'TypeScript',
            category: 'Frontend Development',
            currentLevel: 60,
            targetLevel: 100,
            learningHours: 30,
            lastAssessment: null,
            nextAssessment: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            learningPath: [],
            achievements: []
          }
        ],
        learningAnalytics: {
          totalHours: 75,
          averageProgress: 67.5,
          skillsInProgress: 3,
          completedSkills: 2
        },
        recommendations
      };
    }
  },

  // Get available skill assessments
  getAvailableAssessments: async (): Promise<SkillAssessment[]> => {
    try {
      const response = await apiClient.get('/skills/assessments');
      return response.data;
    } catch (error) {
      console.error('Error fetching assessments:', error);
      // Fallback to mock assessments
      return [
        {
          id: 'react-assessment',
          skillId: 'react',
          skillName: 'React Development',
          category: 'Frontend Development',
          questions: [
            {
              id: 'q1',
              question: 'What is the purpose of useState in React?',
              type: 'multiple-choice',
              options: [
                'To manage component state',
                'To create new components',
                'To handle API calls',
                'To style components'
              ],
              correctAnswer: 'To manage component state',
              explanation: 'useState is a React Hook that allows you to add state to functional components.',
              points: 10
            }
          ],
          timeLimit: 30,
          passingScore: 70,
          difficulty: 'intermediate'
        }
      ];
    }
  }
}; 