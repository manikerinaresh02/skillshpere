import { skillService } from '../../services/skills';
import { apiClient } from '../../utils/api';

// Mock the API client
jest.mock('../../utils/api', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('Skill Assessment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('assessSkill', () => {
    it('should assess skill successfully', async () => {
      const mockAssessmentResult = {
        id: 'assessment_123',
        skillId: 'react',
        userId: 'user_123',
        score: 85,
        totalQuestions: 10,
        correctAnswers: 8,
        timeTaken: 600,
        completedAt: '2024-01-15T10:00:00Z',
        proficiency: 'advanced' as const,
        recommendations: [
          'Focus on advanced concepts to reach expert level',
          'Practice real-world projects to improve practical skills'
        ]
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockAssessmentResult });

      const answers = { 'q1': 'React Hooks', 'q2': 'true' };
      const result = await skillService.assessSkill('react', answers);

      expect(mockedApiClient.post).toHaveBeenCalledWith('/skills/react/assess', { answers });
      expect(result).toEqual(mockAssessmentResult);
    });

    it('should return fallback assessment result when API fails', async () => {
      mockedApiClient.post.mockRejectedValueOnce(new Error('Network error'));

      const answers = { 'q1': 'React Hooks' };
      const result = await skillService.assessSkill('react', answers);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('skillId', 'react');
      expect(result).toHaveProperty('userId', 'current-user');
      expect(result).toHaveProperty('score');
      expect(result.score).toBeGreaterThanOrEqual(60);
      expect(result.score).toBeLessThanOrEqual(100);
      expect(result).toHaveProperty('totalQuestions', 10);
      expect(result).toHaveProperty('correctAnswers');
      expect(result).toHaveProperty('timeTaken');
      expect(result).toHaveProperty('completedAt');
      expect(result).toHaveProperty('proficiency');
      expect(result).toHaveProperty('recommendations');
      expect(Array.isArray(result.recommendations)).toBe(true);
    });
  });

  describe('getRecommendations', () => {
    it('should fetch skill recommendations successfully', async () => {
      const mockRecommendations = [
        {
          skillId: 'react-advanced',
          skillName: 'React Advanced Patterns',
          category: 'Frontend Development',
          confidence: 85,
          reason: 'Based on your React intermediate level and market demand',
          priority: 'high' as const,
          estimatedTime: 40,
          marketValue: 125000,
          relatedSkills: ['TypeScript', 'State Management', 'Performance Optimization']
        }
      ];

      mockedApiClient.get.mockResolvedValueOnce({ data: mockRecommendations });

      const result = await skillService.getRecommendations('user_123');

      expect(mockedApiClient.get).toHaveBeenCalledWith('/users/user_123/skill-recommendations');
      expect(result).toEqual(mockRecommendations);
    });

    it('should return fallback recommendations when API fails', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await skillService.getRecommendations('user_123');

      expect(result).toHaveLength(4);
      expect(result[0]).toHaveProperty('skillId');
      expect(result[0]).toHaveProperty('skillName');
      expect(result[0]).toHaveProperty('category');
      expect(result[0]).toHaveProperty('confidence');
      expect(result[0]).toHaveProperty('reason');
      expect(result[0]).toHaveProperty('priority');
      expect(result[0]).toHaveProperty('estimatedTime');
      expect(result[0]).toHaveProperty('marketValue');
      expect(result[0]).toHaveProperty('relatedSkills');
    });
  });

  describe('trackProgress', () => {
    it('should track learning progress successfully', async () => {
      const mockProgress = {
        skillId: 'react',
        skillName: 'React Development',
        category: 'Frontend Development',
        currentLevel: 75,
        targetLevel: 100,
        learningHours: 45,
        lastAssessment: null,
        nextAssessment: '2024-01-22T10:00:00Z',
        learningPath: [],
        achievements: []
      };

      mockedApiClient.put.mockResolvedValueOnce({ data: mockProgress });

      const progressData = {
        learningHours: 10,
        completedSteps: ['step-1', 'step-2'],
        assessmentScore: 85
      };

      const result = await skillService.trackProgress('react', progressData);

      expect(mockedApiClient.put).toHaveBeenCalledWith('/skills/react/progress', progressData);
      expect(result).toEqual(mockProgress);
    });

    it('should return fallback progress when API fails', async () => {
      mockedApiClient.put.mockRejectedValueOnce(new Error('Network error'));

      const progressData = {
        learningHours: 10,
        completedSteps: ['step-1'],
        assessmentScore: 85
      };

      const result = await skillService.trackProgress('react', progressData);

      expect(result).toHaveProperty('skillId', 'react');
      expect(result).toHaveProperty('skillName', 'React Development');
      expect(result).toHaveProperty('category', 'Frontend Development');
      expect(result).toHaveProperty('currentLevel');
      expect(result).toHaveProperty('targetLevel', 100);
      expect(result).toHaveProperty('learningHours', 10);
      expect(result).toHaveProperty('lastAssessment');
      expect(result).toHaveProperty('nextAssessment');
      expect(result).toHaveProperty('learningPath');
      expect(result).toHaveProperty('achievements');
    });
  });

  describe('getSkillInsights', () => {
    it('should fetch skill insights successfully', async () => {
      const mockInsights = {
        topSkills: [
          {
            skillId: 'react',
            skillName: 'React Development',
            category: 'Frontend Development',
            currentLevel: 75,
            targetLevel: 100,
            learningHours: 45,
            lastAssessment: null,
            nextAssessment: '2024-01-22T10:00:00Z',
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
        recommendations: []
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: mockInsights });

      const result = await skillService.getSkillInsights('user_123');

      expect(mockedApiClient.get).toHaveBeenCalledWith('/users/user_123/skill-insights');
      expect(result).toEqual(mockInsights);
    });

    it('should return fallback insights when API fails', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await skillService.getSkillInsights('user_123');

      expect(result).toHaveProperty('topSkills');
      expect(result).toHaveProperty('learningAnalytics');
      expect(result).toHaveProperty('recommendations');
      expect(Array.isArray(result.topSkills)).toBe(true);
      expect(result.learningAnalytics).toHaveProperty('totalHours');
      expect(result.learningAnalytics).toHaveProperty('averageProgress');
      expect(result.learningAnalytics).toHaveProperty('skillsInProgress');
      expect(result.learningAnalytics).toHaveProperty('completedSkills');
    });
  });

  describe('getAvailableAssessments', () => {
    it('should fetch available assessments successfully', async () => {
      const mockAssessments = [
        {
          id: 'react-assessment',
          skillId: 'react',
          skillName: 'React Development',
          category: 'Frontend Development',
          questions: [
            {
              id: 'q1',
              question: 'What is the purpose of useState in React?',
              type: 'multiple-choice' as const,
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
          difficulty: 'intermediate' as const
        }
      ];

      mockedApiClient.get.mockResolvedValueOnce({ data: mockAssessments });

      const result = await skillService.getAvailableAssessments();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/skills/assessments');
      expect(result).toEqual(mockAssessments);
    });

    it('should return fallback assessments when API fails', async () => {
      mockedApiClient.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await skillService.getAvailableAssessments();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('skillId');
      expect(result[0]).toHaveProperty('skillName');
      expect(result[0]).toHaveProperty('category');
      expect(result[0]).toHaveProperty('questions');
      expect(result[0]).toHaveProperty('timeLimit');
      expect(result[0]).toHaveProperty('passingScore');
      expect(result[0]).toHaveProperty('difficulty');
    });
  });
}); 