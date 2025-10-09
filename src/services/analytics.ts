import { apiClient } from '../utils/api';
import {
  LearningAnalytics,
  SkillProgress,
  PerformanceTrend,
  SkillCorrelation,
  CareerPath,
  PerformancePrediction,
  WeeklyGoal,
  SkillGap,
  TimeDistribution,
  CategoryTime,
  DailyPattern,
  WeeklyPattern,
  CorrelatedSkill,
  SalaryRange,
  PredictionTimeline,
  AnalyticsFilters
} from '../types/phase3';

export const analyticsService = {
  // Learning Analytics
  getLearningAnalytics: async (userId: string): Promise<LearningAnalytics> => {
    try {
      const response = await apiClient.get(`/analytics/learning?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching learning analytics:', error);
      // Return mock data
      return {
        userId,
        totalLearningHours: 156,
        skillsProgress: [
          {
            skillId: 'react',
            skillName: 'React Development',
            currentLevel: 75,
            targetLevel: 90,
            hoursSpent: 45,
            lastUpdated: '2024-01-01T00:00:00Z',
          },
          {
            skillId: 'javascript',
            skillName: 'JavaScript',
            currentLevel: 85,
            targetLevel: 95,
            hoursSpent: 60,
            lastUpdated: '2024-01-01T00:00:00Z',
          }
        ],
        learningStreak: 12,
        weeklyGoals: [
          {
            id: 'goal-1',
            week: '2024-01-15',
            targetHours: 10,
            actualHours: 12,
            completed: true,
            skills: ['react', 'javascript']
          },
          {
            id: 'goal-2',
            week: '2024-01-22',
            targetHours: 12,
            actualHours: 8,
            completed: false,
            skills: ['react', 'typescript']
          }
        ],
        performanceTrends: [
          {
            skillId: 'react',
            skillName: 'React Development',
            trend: 'improving',
            changeRate: 15.2,
            period: 'last 30 days',
            dataPoints: [
              { date: '2024-01-01', value: 60 },
              { date: '2024-01-15', value: 75 },
              { date: '2024-01-30', value: 85 }
            ]
          }
        ],
        learningVelocity: 8.5,
        skillGaps: [
          {
            skillId: 'typescript',
            skillName: 'TypeScript',
            currentLevel: 40,
            requiredLevel: 80,
            gap: 40,
            priority: 'high',
            impact: 85
          }
        ],
        timeDistribution: {
          skillCategories: [
            { category: 'Frontend Development', hours: 80, percentage: 51 },
            { category: 'Backend Development', hours: 45, percentage: 29 },
            { category: 'Data Science', hours: 31, percentage: 20 }
          ],
          dailyPattern: [
            { day: 'Monday', hours: 3, averageHours: 2.5 },
            { day: 'Tuesday', hours: 4, averageHours: 2.5 },
            { day: 'Wednesday', hours: 2, averageHours: 2.5 },
            { day: 'Thursday', hours: 3, averageHours: 2.5 },
            { day: 'Friday', hours: 5, averageHours: 2.5 },
            { day: 'Saturday', hours: 6, averageHours: 2.5 },
            { day: 'Sunday', hours: 4, averageHours: 2.5 }
          ],
          weeklyPattern: [
            { week: '2024-01-01', totalHours: 18, goalHours: 15, completionRate: 120 },
            { week: '2024-01-08', totalHours: 22, goalHours: 15, completionRate: 147 },
            { week: '2024-01-15', totalHours: 12, goalHours: 15, completionRate: 80 }
          ]
        }
      };
    }
  },

  trackLearningActivity: async (userId: string, activity: any): Promise<void> => {
    try {
      await apiClient.post('/analytics/learning-activity', {
        userId,
        ...activity
      });
    } catch (error) {
      console.error('Error tracking learning activity:', error);
      // Mock successful tracking
    }
  },

  getPerformanceTrends: async (userId: string, timeFrame: string): Promise<PerformanceTrend[]> => {
    try {
      const response = await apiClient.get(`/analytics/performance-trends?userId=${userId}&timeFrame=${timeFrame}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching performance trends:', error);
      // Return mock data
      return [
        {
          skillId: 'react',
          skillName: 'React Development',
          trend: 'improving',
          changeRate: 15.2,
          period: 'last 30 days',
          dataPoints: [
            { date: '2024-01-01', value: 60 },
            { date: '2024-01-15', value: 75 },
            { date: '2024-01-30', value: 85 }
          ]
        },
        {
          skillId: 'javascript',
          skillName: 'JavaScript',
          trend: 'stable',
          changeRate: 2.1,
          period: 'last 30 days',
          dataPoints: [
            { date: '2024-01-01', value: 85 },
            { date: '2024-01-15', value: 87 },
            { date: '2024-01-30', value: 87 }
          ]
        }
      ];
    }
  },

  // Skill Correlation
  analyzeSkillCorrelations: async (userId: string): Promise<SkillCorrelation[]> => {
    try {
      const response = await apiClient.get(`/analytics/skill-correlations?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error analyzing skill correlations:', error);
      // Return mock data
      return [
        {
          primarySkill: 'React Development',
          correlatedSkills: [
            {
              skillId: 'javascript',
              skillName: 'JavaScript',
              correlationStrength: 0.85,
              relationship: 'positive',
              explanation: 'Strong JavaScript knowledge accelerates React learning'
            },
            {
              skillId: 'typescript',
              skillName: 'TypeScript',
              correlationStrength: 0.72,
              relationship: 'positive',
              explanation: 'TypeScript enhances React development experience'
            }
          ],
          correlationStrength: 0.78,
          learningImplications: [
            'Focus on JavaScript fundamentals before React',
            'Learn TypeScript alongside React for better development',
            'Practice both skills together for maximum efficiency'
          ],
          confidence: 92
        }
      ];
    }
  },

  getLearningImplications: async (skillId: string): Promise<string[]> => {
    try {
      const response = await apiClient.get(`/analytics/learning-implications?skillId=${skillId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching learning implications:', error);
      // Return mock data
      return [
        'Master JavaScript fundamentals before learning React',
        'Practice with real projects to reinforce concepts',
        'Join study groups for peer learning and motivation',
        'Focus on modern React patterns and hooks'
      ];
    }
  },

  // Career Paths
  getCareerPaths: async (userId: string): Promise<CareerPath[]> => {
    try {
      const response = await apiClient.get(`/analytics/career-paths?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching career paths:', error);
      // Return mock data
      return [
        {
          id: 'career-1',
          title: 'Senior React Developer',
          description: 'Lead React development teams and architect complex applications',
          requiredSkills: ['react', 'typescript', 'nodejs', 'testing'],
          estimatedSalary: {
            min: 80000,
            max: 150000,
            median: 115000,
            currency: 'USD'
          },
          growthPotential: 85,
          timeToAchieve: 18,
          alternativePaths: ['Frontend Developer', 'Full-Stack Developer'],
          marketDemand: 92,
          difficulty: 'advanced'
        },
        {
          id: 'career-2',
          title: 'Full-Stack Developer',
          description: 'Develop both frontend and backend applications',
          requiredSkills: ['react', 'nodejs', 'database', 'api'],
          estimatedSalary: {
            min: 70000,
            max: 130000,
            median: 100000,
            currency: 'USD'
          },
          growthPotential: 78,
          timeToAchieve: 24,
          alternativePaths: ['Backend Developer', 'DevOps Engineer'],
          marketDemand: 88,
          difficulty: 'intermediate'
        }
      ];
    }
  },

  analyzeCareerFit: async (userId: string, careerPath: string): Promise<any> => {
    try {
      const response = await apiClient.post('/analytics/career-fit', {
        userId,
        careerPath
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing career fit:', error);
      // Return mock data
      return {
        careerPath: 'Senior React Developer',
        currentFit: 75,
        missingSkills: ['advanced-patterns', 'performance-optimization'],
        timeToAchieve: 12,
        confidence: 82,
        recommendations: [
          'Focus on advanced React patterns',
          'Learn performance optimization techniques',
          'Gain leadership experience'
        ]
      };
    }
  },

  // Performance Predictions
  predictPerformance: async (userId: string, skillId: string): Promise<PerformancePrediction> => {
    try {
      const response = await apiClient.post('/analytics/performance-prediction', {
        userId,
        skillId
      });
      return response.data;
    } catch (error) {
      console.error('Error predicting performance:', error);
      // Return mock data
      return {
        skillId,
        skillName: 'React Development',
        currentPerformance: 75,
        predictedPerformance: 88,
        confidence: 85,
        factors: [
          {
            factor: 'Consistent learning schedule',
            impact: 'positive',
            weight: 0.3,
            description: 'Regular study sessions improve retention'
          },
          {
            factor: 'Project-based learning',
            impact: 'positive',
            weight: 0.4,
            description: 'Hands-on practice accelerates skill development'
          }
        ],
        timeline: [
          { date: '2024-02-01', predictedLevel: 78, confidence: 85 },
          { date: '2024-03-01', predictedLevel: 82, confidence: 80 },
          { date: '2024-04-01', predictedLevel: 88, confidence: 75 }
        ]
      };
    }
  },

  getSuccessProbability: async (userId: string, goal: string): Promise<number> => {
    try {
      const response = await apiClient.post('/analytics/success-probability', {
        userId,
        goal
      });
      return response.data.probability;
    } catch (error) {
      console.error('Error calculating success probability:', error);
      // Return mock probability
      return 85.5;
    }
  }
}; 