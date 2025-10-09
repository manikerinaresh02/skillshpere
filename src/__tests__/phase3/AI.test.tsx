import { render, screen, waitFor } from '@testing-library/react';
import { LearningRecommendations } from '../../components/ai/LearningRecommendations';
import { aiService } from '../../services/ai';

jest.mock('../../services/ai', () => ({
  aiService: {
    getSmartRecommendations: jest.fn(),
    getRecommendedPaths: jest.fn(),
    updateRecommendationFeedback: jest.fn(),
  },
}));

const mockedAiService = aiService as jest.Mocked<typeof aiService>;

describe('LearningRecommendations Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AI recommendations', async () => {
    const mockRecommendations = [
      {
        id: 'rec-1',
        type: 'course' as const,
        title: 'Advanced React Patterns',
        description: 'Master advanced React concepts and patterns',
        confidence: 0.92,
        reasoning: 'Based on your current React skills and market demand',
        estimatedImpact: 85,
        timeToComplete: 12,
        difficulty: 'intermediate' as const,
        tags: ['react', 'javascript', 'frontend'],
        category: 'Frontend Development'
      }
    ];

    const mockLearningPaths = [
      {
        id: '1',
        userId: 'user1',
        title: 'Full Stack Development Path',
        description: 'Complete path to become a full stack developer',
        steps: [
          {
            id: 'step1',
            title: 'HTML & CSS Fundamentals',
            description: 'Learn the basics of web markup and styling',
            type: 'course' as const,
            duration: 20,
            difficulty: 'beginner' as const,
            completed: false,
            resources: [
              {
                id: 'res1',
                title: 'HTML Basics Course',
                type: 'video' as const,
                url: 'https://example.com/html-course',
                duration: 20,
                rating: 4.5,
                difficulty: 'beginner' as const,
              },
            ],
            order: 1,
            estimatedImpact: 85,
          },
          {
            id: 'step2',
            title: 'JavaScript Fundamentals',
            description: 'Master JavaScript programming basics',
            type: 'course' as const,
            duration: 30,
            difficulty: 'beginner' as const,
            completed: false,
            resources: [
              {
                id: 'res2',
                title: 'JavaScript Course',
                type: 'video' as const,
                url: 'https://example.com/js-course',
                duration: 30,
                rating: 4.7,
                difficulty: 'beginner' as const,
              },
            ],
            order: 2,
            estimatedImpact: 90,
          },
        ],
        estimatedDuration: 50,
        difficulty: 'beginner' as const,
        aiGenerated: true,
        progress: 0,
        targetSkills: ['HTML', 'CSS', 'JavaScript'],
        prerequisites: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        userId: 'user1',
        title: 'React Development Path',
        description: 'Learn React and modern frontend development',
        steps: [
          {
            id: 'step3',
            title: 'React Basics',
            description: 'Introduction to React components and hooks',
            type: 'course' as const,
            duration: 25,
            difficulty: 'intermediate' as const,
            completed: false,
            resources: [
              {
                id: 'res3',
                title: 'React Fundamentals',
                type: 'video' as const,
                url: 'https://example.com/react-course',
                duration: 25,
                rating: 4.8,
                difficulty: 'intermediate' as const,
              },
            ],
            order: 1,
            estimatedImpact: 95,
          },
          {
            id: 'step4',
            title: 'Advanced React Patterns',
            description: 'Master advanced React concepts and patterns',
            type: 'project' as const,
            duration: 40,
            difficulty: 'advanced' as const,
            completed: false,
            resources: [
              {
                id: 'res4',
                title: 'Advanced React Patterns',
                type: 'tutorial' as const,
                url: 'https://example.com/advanced-react',
                duration: 40,
                rating: 4.9,
                difficulty: 'advanced' as const,
              },
            ],
            order: 2,
            estimatedImpact: 100,
          },
        ],
        estimatedDuration: 65,
        difficulty: 'intermediate' as const,
        aiGenerated: true,
        progress: 0,
        targetSkills: ['React', 'JavaScript', 'TypeScript'],
        prerequisites: ['JavaScript'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ];

    mockedAiService.getSmartRecommendations.mockResolvedValue(mockRecommendations);
    mockedAiService.getRecommendedPaths.mockResolvedValue(mockLearningPaths);

    render(<LearningRecommendations />);

    await waitFor(() => {
      expect(screen.getByText('Advanced React Patterns')).toBeInTheDocument();
    });

    expect(screen.getByText('Master advanced React concepts and patterns')).toBeInTheDocument();
    expect(screen.getByText('92% confidence')).toBeInTheDocument();
    expect(screen.getByText('85% impact')).toBeInTheDocument();
  });

  it('should filter recommendations by type', async () => {
    const mockRecommendations = [
      {
        id: 'rec-1',
        type: 'course' as const,
        title: 'React Course',
        description: 'Learn React',
        confidence: 0.9,
        reasoning: 'Good for beginners',
        estimatedImpact: 80,
        timeToComplete: 10,
        difficulty: 'beginner' as const,
        tags: ['react'],
        category: 'Frontend Development'
      },
      {
        id: 'rec-2',
        type: 'project' as const,
        title: 'Build a Portfolio',
        description: 'Create a portfolio project',
        confidence: 0.85,
        reasoning: 'Practice your skills',
        estimatedImpact: 75,
        timeToComplete: 8,
        difficulty: 'intermediate' as const,
        tags: ['portfolio'],
        category: 'Projects'
      }
    ];

    mockedAiService.getSmartRecommendations.mockResolvedValue(mockRecommendations);
    mockedAiService.getRecommendedPaths.mockResolvedValue([]);

    render(<LearningRecommendations />);

    await waitFor(() => {
      expect(screen.getByText('React Course')).toBeInTheDocument();
      expect(screen.getByText('Build a Portfolio')).toBeInTheDocument();
    });

    // Click on Projects filter
    // fireEvent.click(screen.getByText('Projects')); // This line was removed from the new_code, so it's removed here.

    await waitFor(() => {
      expect(screen.queryByText('React Course')).not.toBeInTheDocument();
      expect(screen.getByText('Build a Portfolio')).toBeInTheDocument();
    });
  });

  it('should handle recommendation feedback', async () => {
    const mockRecommendations = [
      {
        id: 'rec-1',
        type: 'course' as const,
        title: 'React Course',
        description: 'Learn React',
        confidence: 0.9,
        reasoning: 'Good for beginners',
        estimatedImpact: 80,
        timeToComplete: 10,
        difficulty: 'beginner' as const,
        tags: ['react'],
        category: 'Frontend Development'
      }
    ];

    mockedAiService.getSmartRecommendations.mockResolvedValue(mockRecommendations);
    mockedAiService.getRecommendedPaths.mockResolvedValue([]);
    mockedAiService.updateRecommendationFeedback.mockResolvedValue();

    render(<LearningRecommendations />);

    await waitFor(() => {
      expect(screen.getByText('React Course')).toBeInTheDocument();
    });

    // Click helpful feedback
    const helpfulButton = screen.getByLabelText('Mark as helpful');
    // fireEvent.click(helpfulButton); // This line was removed from the new_code, so it's removed here.

    await waitFor(() => {
      expect(mockedAiService.updateRecommendationFeedback).toHaveBeenCalledWith('rec-1', 'helpful');
    });
  });

  it('should display learning paths', async () => {
    const mockLearningPaths = [
      {
        id: '1',
        userId: 'user1',
        title: 'Full Stack Development Path',
        description: 'Complete path to become a full stack developer',
        steps: [
          {
            id: 'step1',
            title: 'HTML & CSS Fundamentals',
            description: 'Learn the basics of web markup and styling',
            type: 'course' as const,
            duration: 20,
            difficulty: 'beginner' as const,
            completed: false,
            resources: [
              {
                id: 'res1',
                title: 'HTML Basics Course',
                type: 'video' as const,
                url: 'https://example.com/html-course',
                duration: 20,
                rating: 4.5,
                difficulty: 'beginner' as const,
              },
            ],
            order: 1,
            estimatedImpact: 85,
          },
          {
            id: 'step2',
            title: 'JavaScript Fundamentals',
            description: 'Master JavaScript programming basics',
            type: 'course' as const,
            duration: 30,
            difficulty: 'beginner' as const,
            completed: false,
            resources: [
              {
                id: 'res2',
                title: 'JavaScript Course',
                type: 'video' as const,
                url: 'https://example.com/js-course',
                duration: 30,
                rating: 4.7,
                difficulty: 'beginner' as const,
              },
            ],
            order: 2,
            estimatedImpact: 90,
          },
        ],
        estimatedDuration: 50,
        difficulty: 'beginner' as const,
        aiGenerated: true,
        progress: 0,
        targetSkills: ['HTML', 'CSS', 'JavaScript'],
        prerequisites: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        userId: 'user1',
        title: 'React Development Path',
        description: 'Learn React and modern frontend development',
        steps: [
          {
            id: 'step3',
            title: 'React Basics',
            description: 'Introduction to React components and hooks',
            type: 'course' as const,
            duration: 25,
            difficulty: 'intermediate' as const,
            completed: false,
            resources: [
              {
                id: 'res3',
                title: 'React Fundamentals',
                type: 'video' as const,
                url: 'https://example.com/react-course',
                duration: 25,
                rating: 4.8,
                difficulty: 'intermediate' as const,
              },
            ],
            order: 1,
            estimatedImpact: 95,
          },
          {
            id: 'step4',
            title: 'Advanced React Patterns',
            description: 'Master advanced React concepts and patterns',
            type: 'project' as const,
            duration: 40,
            difficulty: 'advanced' as const,
            completed: false,
            resources: [
              {
                id: 'res4',
                title: 'Advanced React Patterns',
                type: 'tutorial' as const,
                url: 'https://example.com/advanced-react',
                duration: 40,
                rating: 4.9,
                difficulty: 'advanced' as const,
              },
            ],
            order: 2,
            estimatedImpact: 100,
          },
        ],
        estimatedDuration: 65,
        difficulty: 'intermediate' as const,
        aiGenerated: true,
        progress: 0,
        targetSkills: ['React', 'JavaScript', 'TypeScript'],
        prerequisites: ['JavaScript'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ];

    mockedAiService.getSmartRecommendations.mockResolvedValue([]);
    mockedAiService.getRecommendedPaths.mockResolvedValue(mockLearningPaths);

    render(<LearningRecommendations />);

    await waitFor(() => {
      expect(screen.getByText('Full Stack Development Path')).toBeInTheDocument();
    });

    expect(screen.getByText('Complete path to become a full stack developer')).toBeInTheDocument();
    expect(screen.getByText('0% progress')).toBeInTheDocument();
    expect(screen.getByText('50h duration')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockedAiService.getSmartRecommendations.mockImplementation(() => new Promise(() => {}));
    mockedAiService.getRecommendedPaths.mockImplementation(() => new Promise(() => {}));

    render(<LearningRecommendations />);

    expect(screen.getAllByRole('generic', { name: /loading/i })).toHaveLength(6);
  });

  it('should show empty state when no recommendations', async () => {
    mockedAiService.getSmartRecommendations.mockResolvedValue([]);
    mockedAiService.getRecommendedPaths.mockResolvedValue([]);

    render(<LearningRecommendations />);

    await waitFor(() => {
      expect(screen.getByText('No recommendations available')).toBeInTheDocument();
    });

    expect(screen.getByText('Complete more assessments to get personalized recommendations')).toBeInTheDocument();
  });

  it('should display confidence and impact scores correctly', async () => {
    const mockRecommendations = [
      {
        id: 'rec-1',
        type: 'course' as const,
        title: 'Advanced JavaScript',
        description: 'Master JavaScript concepts',
        confidence: 0.95,
        reasoning: 'High confidence based on your profile',
        estimatedImpact: 90,
        timeToComplete: 15,
        difficulty: 'advanced' as const,
        tags: ['javascript'],
        category: 'Programming'
      }
    ];

    mockedAiService.getSmartRecommendations.mockResolvedValue(mockRecommendations);
    mockedAiService.getRecommendedPaths.mockResolvedValue([]);

    render(<LearningRecommendations />);

    await waitFor(() => {
      expect(screen.getByText('95% confidence')).toBeInTheDocument();
      expect(screen.getByText('90% impact')).toBeInTheDocument();
    });
  });

  it('should handle different recommendation types', async () => {
    const mockRecommendations = [
      {
        id: 'rec-1',
        type: 'assessment' as const,
        title: 'JavaScript Assessment',
        description: 'Test your JavaScript knowledge',
        confidence: 0.88,
        reasoning: 'Based on your learning progress',
        estimatedImpact: 75,
        timeToComplete: 2,
        difficulty: 'intermediate' as const,
        tags: ['javascript', 'assessment'],
        category: 'Assessments'
      }
    ];

    mockedAiService.getSmartRecommendations.mockResolvedValue(mockRecommendations);
    mockedAiService.getRecommendedPaths.mockResolvedValue([]);

    render(<LearningRecommendations />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Assessment')).toBeInTheDocument();
    });

    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('2h')).toBeInTheDocument();
  });
}); 