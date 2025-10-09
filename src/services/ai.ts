import { apiClient } from '../utils/api';
import {
  LearningPath,
  SmartRecommendation,
  PredictionResult,
  CareerPrediction,
  LearningStep,
  LearningResource,
  PerformanceMetric,
  PredictionFactor,
} from '../types/phase3';

export const aiService = {
  // Learning Paths
  generateLearningPath: async (userId: string, targetSkills: string[]): Promise<LearningPath> => {
    try {
      const response = await apiClient.post('/ai/learning-paths', {
        userId,
        targetSkills
      });
      return response.data;
    } catch (error) {
      console.error('Error generating learning path:', error);
      // Return mock data
      return {
        id: 'path-1',
        userId,
        title: 'React to Full-Stack Developer',
        description: 'A comprehensive path to become a full-stack developer with React',
        steps: [
          {
            id: 'step-1',
            title: 'Master React Fundamentals',
            description: 'Learn React hooks, state management, and component patterns',
            type: 'course',
            duration: 20,
            difficulty: 'intermediate',
            completed: false,
            resources: [
              {
                id: 'res-1',
                title: 'React Complete Guide',
                type: 'course',
                url: 'https://example.com/react-course',
                duration: 15,
                rating: 4.8,
                difficulty: 'intermediate'
              }
            ],
            order: 1,
            estimatedImpact: 85
          },
          {
            id: 'step-2',
            title: 'Build Real Projects',
            description: 'Apply React knowledge to real-world projects',
            type: 'project',
            duration: 30,
            difficulty: 'intermediate',
            completed: false,
            resources: [
              {
                id: 'res-2',
                title: 'E-commerce Project',
                type: 'project',
                url: 'https://example.com/ecommerce-project',
                duration: 25,
                rating: 4.9,
                difficulty: 'intermediate'
              }
            ],
            order: 2,
            estimatedImpact: 90
          }
        ],
        estimatedDuration: 50,
        difficulty: 'intermediate',
        aiGenerated: true,
        progress: 0,
        targetSkills: ['react', 'javascript', 'nodejs'],
        prerequisites: ['javascript-basics'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  },

  updateLearningPath: async (pathId: string, progress: number): Promise<LearningPath> => {
    try {
      const response = await apiClient.put(`/ai/learning-paths/${pathId}`, { progress });
      return response.data;
    } catch (error) {
      console.error('Error updating learning path:', error);
      // Return mock updated path
      return {
        id: pathId,
        userId: 'user-1',
        title: 'React to Full-Stack Developer',
        description: 'A comprehensive path to become a full-stack developer with React',
        steps: [],
        estimatedDuration: 50,
        difficulty: 'intermediate',
        aiGenerated: true,
        progress,
        targetSkills: ['react', 'javascript', 'nodejs'],
        prerequisites: ['javascript-basics'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  },

  getRecommendedPaths: async (userId: string): Promise<LearningPath[]> => {
    try {
      const response = await apiClient.get(`/ai/learning-paths/recommended?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended paths:', error);
      // Return mock data
      return [
        {
          id: 'path-1',
          userId,
          title: 'React to Full-Stack Developer',
          description: 'A comprehensive path to become a full-stack developer with React',
          steps: [],
          estimatedDuration: 50,
          difficulty: 'intermediate',
          aiGenerated: true,
          progress: 0,
          targetSkills: ['react', 'javascript', 'nodejs'],
          prerequisites: ['javascript-basics'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'path-2',
          userId,
          title: 'Data Science with Python',
          description: 'Learn data science fundamentals and machine learning',
          steps: [],
          estimatedDuration: 80,
          difficulty: 'advanced',
          aiGenerated: true,
          progress: 0,
          targetSkills: ['python', 'data-science', 'ml'],
          prerequisites: ['python-basics'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }
  },

  // Adaptive Assessments
  createAdaptiveAssessment: async (skillId: string, userId: string): Promise<any> => { // Changed return type to any as AdaptiveAssessment is removed
    try {
      const response = await apiClient.post('/ai/adaptive-assessments', {
        skillId,
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Error creating adaptive assessment:', error);
      // Return mock data
      return {
        id: 'assessment-1',
        skillId,
        userId,
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
            difficulty: 'medium',
            explanation: 'useState is a React Hook that allows you to add state to functional components.',
            points: 10,
            estimatedTime: 30
          }
        ],
        currentDifficulty: 'medium',
        adaptiveAlgorithm: 'item-response-theory',
        performanceHistory: [],
        currentQuestionIndex: 0,
        totalQuestions: 10,
        timeLimit: 600,
        isCompleted: false
      };
    }
  },

  submitAdaptiveAnswer: async (assessmentId: string, questionId: string, answer: string): Promise<any> => { // Changed return type to any
    try {
      const response = await apiClient.post(`/ai/adaptive-assessments/${assessmentId}/answer`, {
        questionId,
        answer
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting adaptive answer:', error);
      // Return mock updated assessment
      return {
        id: assessmentId,
        skillId: 'react',
        userId: 'user-1',
        questions: [],
        currentDifficulty: 'hard',
        adaptiveAlgorithm: 'item-response-theory',
        performanceHistory: [
          {
            questionId,
            userAnswer: answer,
            isCorrect: answer === 'To manage component state',
            timeSpent: 25,
            difficulty: 'medium',
            timestamp: new Date().toISOString()
          }
        ],
        currentQuestionIndex: 1,
        totalQuestions: 10,
        timeLimit: 600,
        isCompleted: false
      };
    }
  },

  getNextQuestion: async (assessmentId: string): Promise<any> => { // Changed return type to any
    try {
      const response = await apiClient.get(`/ai/adaptive-assessments/${assessmentId}/next-question`);
      return response.data;
    } catch (error) {
      console.error('Error getting next question:', error);
      // Return mock question
      return {
        id: 'q2',
        question: 'How do you handle side effects in React functional components?',
        type: 'multiple-choice',
        options: [
          'useEffect Hook',
          'useState Hook',
          'useContext Hook',
          'useReducer Hook'
        ],
        correctAnswer: 'useEffect Hook',
        difficulty: 'hard',
        explanation: 'useEffect is used to handle side effects in functional components.',
        points: 15,
        estimatedTime: 45
      };
    }
  },

  // Smart Recommendations
  getSmartRecommendations: async (userId: string): Promise<SmartRecommendation[]> => {
    try {
      const response = await apiClient.get(`/ai/recommendations?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching smart recommendations:', error);
      // Return mock data
      return [
        {
          id: 'rec-1',
          type: 'course',
          title: 'Advanced React Patterns',
          description: 'Learn advanced React patterns and best practices',
          confidence: 92,
          reasoning: 'Based on your React intermediate level and learning history',
          estimatedImpact: 85,
          timeToComplete: 15,
          difficulty: 'advanced',
          tags: ['react', 'patterns', 'advanced']
        },
        {
          id: 'rec-2',
          type: 'project',
          title: 'Build a Full-Stack App',
          description: 'Create a complete full-stack application with React and Node.js',
          confidence: 88,
          reasoning: 'Matches your career goals and current skill level',
          estimatedImpact: 90,
          timeToComplete: 40,
          difficulty: 'intermediate',
          tags: ['react', 'nodejs', 'fullstack']
        },
        {
          id: 'rec-3',
          type: 'assessment',
          title: 'React Advanced Assessment',
          description: 'Test your advanced React knowledge and get personalized feedback',
          confidence: 85,
          reasoning: 'Based on your recent learning progress',
          estimatedImpact: 75,
          timeToComplete: 2,
          difficulty: 'advanced',
          tags: ['react', 'assessment', 'advanced']
        }
      ];
    }
  },

  updateRecommendationFeedback: async (recommendationId: string, feedback: 'helpful' | 'not_helpful'): Promise<void> => {
    try {
      await apiClient.post(`/ai/recommendations/${recommendationId}/feedback`, { feedback });
    } catch (error) {
      console.error('Error updating recommendation feedback:', error);
      // Mock successful feedback
    }
  },

  // Predictive Analytics
  predictLearningOutcome: async (userId: string, skillId: string): Promise<PredictionResult> => {
    try {
      const response = await apiClient.post('/ai/predictions/learning-outcome', {
        userId,
        skillId
      });
      return response.data;
    } catch (error) {
      console.error('Error predicting learning outcome:', error);
      // Return mock prediction
      return {
        skillId,
        skillName: 'React Development',
        currentLevel: 65,
        predictedLevel: 85,
        timeToTarget: 8, // weeks
        confidence: 87,
        factors: [
          {
            factor: 'Consistent learning schedule',
            impact: 'positive',
            weight: 0.3,
            description: 'You study regularly which improves retention'
          },
          {
            factor: 'Previous JavaScript experience',
            impact: 'positive',
            weight: 0.4,
            description: 'Strong foundation in JavaScript accelerates React learning'
          },
          {
            factor: 'Limited project practice',
            impact: 'negative',
            weight: 0.2,
            description: 'More hands-on projects would accelerate learning'
          }
        ],
        recommendations: [
          'Increase project-based learning',
          'Practice React hooks daily',
          'Join study groups for peer learning'
        ]
      };
    }
  },

  predictCareerPath: async (userId: string, targetRole: string): Promise<CareerPrediction> => {
    try {
      const response = await apiClient.post('/ai/predictions/career-path', {
        userId,
        targetRole
      });
      return response.data;
    } catch (error) {
      console.error('Error predicting career path:', error);
      // Return mock prediction
      return {
        targetRole: 'Senior React Developer',
        currentFit: 75,
        timeToAchieve: 12, // months
        requiredSkills: ['react', 'typescript', 'nodejs', 'testing'],
        missingSkills: ['advanced-patterns', 'performance-optimization'],
        learningPath: {
          id: 'career-path-1',
          userId,
          title: 'Senior React Developer Path',
          description: 'Path to become a senior React developer',
          steps: [],
          estimatedDuration: 200,
          difficulty: 'advanced',
          aiGenerated: true,
          progress: 0,
          targetSkills: ['react', 'typescript', 'nodejs'],
          prerequisites: ['javascript-basics'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        confidence: 82,
        alternativeRoles: ['Frontend Developer', 'Full-Stack Developer', 'UI/UX Developer']
      };
    }
  }
}; 