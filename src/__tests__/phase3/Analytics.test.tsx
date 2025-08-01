import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LearningAnalytics } from '../../components/analytics/LearningAnalytics';
import { analyticsService } from '../../services/analytics';

jest.mock('../../services/analytics', () => ({
  analyticsService: {
    getLearningAnalytics: jest.fn(),
    getPerformanceTrends: jest.fn(),
    analyzeSkillCorrelations: jest.fn(),
  },
}));

const mockedAnalyticsService = analyticsService as jest.Mocked<typeof analyticsService>;

describe('LearningAnalytics Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render learning analytics dashboard', async () => {
    const mockAnalytics = {
      userId: 'user-1',
      totalLearningHours: 156,
      skillsProgress: [
        {
          skillId: 'react',
          skillName: 'React',
          currentLevel: 85,
          targetLevel: 90,
          hoursSpent: 45,
          lastUpdated: new Date().toISOString()
        }
      ],
      learningStreak: 12,
      weeklyGoals: [
        {
          id: 'goal-1',
          title: 'Complete React Course',
          targetHours: 10,
          completedHours: 8,
          weekStart: new Date().toISOString(),
          isCompleted: false
        }
      ],
      performanceTrends: [
        {
          date: new Date().toISOString(),
          hoursLearned: 5,
          skillsImproved: 2,
          assessmentsCompleted: 1
        }
      ],
      learningVelocity: 2.3,
      skillGaps: [
        {
          skillId: 'typescript',
          skillName: 'TypeScript',
          currentLevel: 60,
          recommendedLevel: 80,
          gapSize: 20,
          priority: 'high' as const
        }
      ],
      timeDistribution: {
        totalHours: 156,
        categories: [
          {
            category: 'Frontend Development',
            hours: 45,
            percentage: 28.8
          }
        ],
        dailyPattern: {
          monday: 8,
          tuesday: 6,
          wednesday: 7,
          thursday: 5,
          friday: 9,
          saturday: 4,
          sunday: 3
        },
        weeklyPattern: {
          week1: 35,
          week2: 42,
          week3: 38,
          week4: 41
        }
      }
    };

    mockedAnalyticsService.getLearningAnalytics.mockResolvedValue(mockAnalytics);

    render(<LearningAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('156h')).toBeInTheDocument();
    });

    expect(screen.getByText('12 days')).toBeInTheDocument();
    expect(screen.getByText('2.3x')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('should filter analytics by time frame', async () => {
    const mockAnalytics = {
      userId: 'user-1',
      totalLearningHours: 156,
      skillsProgress: [],
      learningStreak: 12,
      weeklyGoals: [],
      performanceTrends: [],
      learningVelocity: 2.3,
      skillGaps: [],
      timeDistribution: {
        totalHours: 156,
        categories: [],
        dailyPattern: {
          monday: 8,
          tuesday: 6,
          wednesday: 7,
          thursday: 5,
          friday: 9,
          saturday: 4,
          sunday: 3
        },
        weeklyPattern: {
          week1: 35,
          week2: 42,
          week3: 38,
          week4: 41
        }
      }
    };

    mockedAnalyticsService.getLearningAnalytics.mockResolvedValue(mockAnalytics);

    render(<LearningAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('156h')).toBeInTheDocument();
    });

    // Change time frame to 7 days
    const timeFrameSelect = screen.getByRole('combobox');
    fireEvent.click(timeFrameSelect);
    
    const sevenDaysOption = screen.getByText('7 days');
    fireEvent.click(sevenDaysOption);

    await waitFor(() => {
      expect(mockedAnalyticsService.getLearningAnalytics).toHaveBeenCalledWith('current-user', '7d');
    });
  });

  it('should display skill gaps correctly', async () => {
    const mockAnalytics = {
      userId: 'user-1',
      totalLearningHours: 156,
      skillsProgress: [],
      learningStreak: 12,
      weeklyGoals: [],
      performanceTrends: [],
      learningVelocity: 2.3,
      skillGaps: [
        {
          skillId: 'typescript',
          skillName: 'TypeScript',
          currentLevel: 60,
          recommendedLevel: 80,
          gapSize: 20,
          priority: 'high' as const
        },
        {
          skillId: 'nodejs',
          skillName: 'Node.js',
          currentLevel: 45,
          recommendedLevel: 70,
          gapSize: 25,
          priority: 'medium' as const
        }
      ],
      timeDistribution: {
        totalHours: 156,
        categories: [],
        dailyPattern: {
          monday: 8,
          tuesday: 6,
          wednesday: 7,
          thursday: 5,
          friday: 9,
          saturday: 4,
          sunday: 3
        },
        weeklyPattern: {
          week1: 35,
          week2: 42,
          week3: 38,
          week4: 41
        }
      }
    };

    mockedAnalyticsService.getLearningAnalytics.mockResolvedValue(mockAnalytics);

    render(<LearningAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });

    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('20% gap')).toBeInTheDocument();
  });

  it('should show performance trends', async () => {
    const mockAnalytics = {
      userId: 'user-1',
      totalLearningHours: 156,
      skillsProgress: [],
      learningStreak: 12,
      weeklyGoals: [],
      performanceTrends: [
        {
          date: new Date().toISOString(),
          hoursLearned: 5,
          skillsImproved: 2,
          assessmentsCompleted: 1
        },
        {
          date: new Date(Date.now() - 86400000).toISOString(),
          hoursLearned: 3,
          skillsImproved: 1,
          assessmentsCompleted: 0
        }
      ],
      learningVelocity: 2.3,
      skillGaps: [],
      timeDistribution: {
        totalHours: 156,
        categories: [],
        dailyPattern: {
          monday: 8,
          tuesday: 6,
          wednesday: 7,
          thursday: 5,
          friday: 9,
          saturday: 4,
          sunday: 3
        },
        weeklyPattern: {
          week1: 35,
          week2: 42,
          week3: 38,
          week4: 41
        }
      }
    };

    mockedAnalyticsService.getLearningAnalytics.mockResolvedValue(mockAnalytics);

    render(<LearningAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('Performance Trends')).toBeInTheDocument();
    });

    expect(screen.getByText('5h')).toBeInTheDocument();
    expect(screen.getByText('2 skills')).toBeInTheDocument();
  });

  it('should display time distribution', async () => {
    const mockAnalytics = {
      userId: 'user-1',
      totalLearningHours: 156,
      skillsProgress: [],
      learningStreak: 12,
      weeklyGoals: [],
      performanceTrends: [],
      learningVelocity: 2.3,
      skillGaps: [],
      timeDistribution: {
        totalHours: 156,
        categories: [
          {
            category: 'Frontend Development',
            hours: 45,
            percentage: 28.8
          },
          {
            category: 'Backend Development',
            hours: 32,
            percentage: 20.5
          }
        ],
        dailyPattern: {
          monday: 8,
          tuesday: 6,
          wednesday: 7,
          thursday: 5,
          friday: 9,
          saturday: 4,
          sunday: 3
        },
        weeklyPattern: {
          week1: 35,
          week2: 42,
          week3: 38,
          week4: 41
        }
      }
    };

    mockedAnalyticsService.getLearningAnalytics.mockResolvedValue(mockAnalytics);

    render(<LearningAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('Time Distribution')).toBeInTheDocument();
    });

    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('45h')).toBeInTheDocument();
    expect(screen.getByText('28.8%')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockedAnalyticsService.getLearningAnalytics.mockImplementation(() => new Promise(() => {}));

    render(<LearningAnalytics />);

    expect(screen.getAllByRole('generic', { name: /loading/i })).toHaveLength(6);
  });

  it('should show empty state when no analytics data', async () => {
    mockedAnalyticsService.getLearningAnalytics.mockResolvedValue(null);

    render(<LearningAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('No analytics data available')).toBeInTheDocument();
    });

    expect(screen.getByText('Complete some learning activities to see your analytics')).toBeInTheDocument();
  });

  it('should display streak colors correctly', async () => {
    const mockAnalytics = {
      userId: 'user-1',
      totalLearningHours: 156,
      skillsProgress: [],
      learningStreak: 25,
      weeklyGoals: [],
      performanceTrends: [],
      learningVelocity: 2.3,
      skillGaps: [],
      timeDistribution: {
        totalHours: 156,
        categories: [],
        dailyPattern: {
          monday: 8,
          tuesday: 6,
          wednesday: 7,
          thursday: 5,
          friday: 9,
          saturday: 4,
          sunday: 3
        },
        weeklyPattern: {
          week1: 35,
          week2: 42,
          week3: 38,
          week4: 41
        }
      }
    };

    mockedAnalyticsService.getLearningAnalytics.mockResolvedValue(mockAnalytics);

    render(<LearningAnalytics />);

    await waitFor(() => {
      expect(screen.getByText('25 days')).toBeInTheDocument();
    });

    // The streak should have a green color for high streak
    const streakElement = screen.getByText('25 days');
    expect(streakElement).toBeInTheDocument();
  });
}); 