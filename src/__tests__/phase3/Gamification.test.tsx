import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Achievements } from '../../components/gamification/Achievements';
import { gamificationService } from '../../services/gamification';

jest.mock('../../services/gamification', () => ({
  gamificationService: {
    getAchievements: jest.fn(),
    getUserStats: jest.fn(),
    unlockAchievement: jest.fn(),
  },
}));

const mockedGamificationService = gamificationService as jest.Mocked<typeof gamificationService>;

describe('Achievements Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render achievements dashboard', async () => {
    const mockAchievements = [
      {
        id: 'ach-1',
        title: 'First Steps',
        description: 'Complete your first assessment',
        icon: '🎯',
        category: 'learning' as const,
        points: 100,
        rarity: 'common' as const,
        unlockedAt: new Date().toISOString(),
        progress: 100,
        maxProgress: 100,
        requirements: [
          {
            type: 'assessment_completed' as const,
            value: 1,
            current: 1
          }
        ]
      }
    ];

    const mockUserStats = {
      userId: 'user-1',
      totalPoints: 1250,
      level: 8,
      experience: 850,
      experienceToNextLevel: 150,
      achievements: 12,
      badges: 5,
      currentStreak: 7,
      longestStreak: 15
    };

    mockedGamificationService.getAchievements.mockResolvedValue(mockAchievements);
    mockedGamificationService.getUserStats.mockResolvedValue(mockUserStats);

    render(<Achievements />);

    await waitFor(() => {
      expect(screen.getByText('First Steps')).toBeInTheDocument();
    });

    expect(screen.getByText('Complete your first assessment')).toBeInTheDocument();
    expect(screen.getByText('100 points')).toBeInTheDocument();
    expect(screen.getByText('Level 8')).toBeInTheDocument();
    expect(screen.getByText('1,250 points')).toBeInTheDocument();
  });

  it('should filter achievements by category', async () => {
    const mockAchievements = [
      {
        id: 'ach-1',
        title: 'Learning Master',
        description: 'Complete 10 courses',
        icon: '📚',
        category: 'learning' as const,
        points: 500,
        rarity: 'rare' as const,
        unlockedAt: new Date().toISOString(),
        progress: 100,
        maxProgress: 100,
        requirements: []
      },
      {
        id: 'ach-2',
        title: 'Social Butterfly',
        description: 'Join 5 study groups',
        icon: '👥',
        category: 'social' as const,
        points: 300,
        rarity: 'uncommon' as const,
        unlockedAt: null,
        progress: 60,
        maxProgress: 100,
        requirements: []
      }
    ];

    const mockUserStats = {
      userId: 'user-1',
      totalPoints: 1250,
      level: 8,
      experience: 850,
      experienceToNextLevel: 150,
      achievements: 12,
      badges: 5,
      currentStreak: 7,
      longestStreak: 15
    };

    mockedGamificationService.getAchievements.mockResolvedValue(mockAchievements);
    mockedGamificationService.getUserStats.mockResolvedValue(mockUserStats);

    render(<Achievements />);

    await waitFor(() => {
      expect(screen.getByText('Learning Master')).toBeInTheDocument();
      expect(screen.getByText('Social Butterfly')).toBeInTheDocument();
    });

    // Click on Social filter
    fireEvent.click(screen.getByText('Social'));

    await waitFor(() => {
      expect(screen.queryByText('Learning Master')).not.toBeInTheDocument();
      expect(screen.getByText('Social Butterfly')).toBeInTheDocument();
    });
  });

  it('should display user stats correctly', async () => {
    const mockAchievements = [];
    const mockUserStats = {
      userId: 'user-1',
      totalPoints: 2500,
      level: 12,
      experience: 1200,
      experienceToNextLevel: 300,
      achievements: 18,
      badges: 8,
      currentStreak: 12,
      longestStreak: 25
    };

    mockedGamificationService.getAchievements.mockResolvedValue(mockAchievements);
    mockedGamificationService.getUserStats.mockResolvedValue(mockUserStats);

    render(<Achievements />);

    await waitFor(() => {
      expect(screen.getByText('Level 12')).toBeInTheDocument();
    });

    expect(screen.getByText('2,500 points')).toBeInTheDocument();
    expect(screen.getByText('18 achievements')).toBeInTheDocument();
    expect(screen.getByText('8 badges')).toBeInTheDocument();
    expect(screen.getByText('12 days')).toBeInTheDocument();
  });

  it('should show achievement progress', async () => {
    const mockAchievements = [
      {
        id: 'ach-1',
        title: 'Skill Master',
        description: 'Reach expert level in 5 skills',
        icon: '⭐',
        category: 'skill' as const,
        points: 1000,
        rarity: 'epic' as const,
        unlockedAt: null,
        progress: 60,
        maxProgress: 100,
        requirements: [
          {
            type: 'skill_level' as const,
            value: 5,
            current: 3
          }
        ]
      }
    ];

    const mockUserStats = {
      userId: 'user-1',
      totalPoints: 1250,
      level: 8,
      experience: 850,
      experienceToNextLevel: 150,
      achievements: 12,
      badges: 5,
      currentStreak: 7,
      longestStreak: 15
    };

    mockedGamificationService.getAchievements.mockResolvedValue(mockAchievements);
    mockedGamificationService.getUserStats.mockResolvedValue(mockUserStats);

    render(<Achievements />);

    await waitFor(() => {
      expect(screen.getByText('Skill Master')).toBeInTheDocument();
    });

    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('3/5 skills')).toBeInTheDocument();
  });

  it('should display rarity colors correctly', async () => {
    const mockAchievements = [
      {
        id: 'ach-1',
        title: 'Common Achievement',
        description: 'A common achievement',
        icon: '🏆',
        category: 'milestone' as const,
        points: 50,
        rarity: 'common' as const,
        unlockedAt: new Date().toISOString(),
        progress: 100,
        maxProgress: 100,
        requirements: []
      },
      {
        id: 'ach-2',
        title: 'Rare Achievement',
        description: 'A rare achievement',
        icon: '💎',
        category: 'milestone' as const,
        points: 200,
        rarity: 'rare' as const,
        unlockedAt: new Date().toISOString(),
        progress: 100,
        maxProgress: 100,
        requirements: []
      }
    ];

    const mockUserStats = {
      userId: 'user-1',
      totalPoints: 1250,
      level: 8,
      experience: 850,
      experienceToNextLevel: 150,
      achievements: 12,
      badges: 5,
      currentStreak: 7,
      longestStreak: 15
    };

    mockedGamificationService.getAchievements.mockResolvedValue(mockAchievements);
    mockedGamificationService.getUserStats.mockResolvedValue(mockUserStats);

    render(<Achievements />);

    await waitFor(() => {
      expect(screen.getByText('Common Achievement')).toBeInTheDocument();
      expect(screen.getByText('Rare Achievement')).toBeInTheDocument();
    });

    expect(screen.getByText('Common')).toBeInTheDocument();
    expect(screen.getByText('Rare')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockedGamificationService.getAchievements.mockImplementation(() => new Promise(() => {}));
    mockedGamificationService.getUserStats.mockImplementation(() => new Promise(() => {}));

    render(<Achievements />);

    expect(screen.getAllByRole('generic', { name: /loading/i })).toHaveLength(6);
  });

  it('should show empty state when no achievements', async () => {
    mockedGamificationService.getAchievements.mockResolvedValue([]);
    mockedGamificationService.getUserStats.mockResolvedValue({
      userId: 'user-1',
      totalPoints: 0,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      achievements: 0,
      badges: 0,
      currentStreak: 0,
      longestStreak: 0
    });

    render(<Achievements />);

    await waitFor(() => {
      expect(screen.getByText('No achievements yet')).toBeInTheDocument();
    });

    expect(screen.getByText('Start learning to unlock achievements')).toBeInTheDocument();
  });

  it('should display achievement summary correctly', async () => {
    const mockAchievements = [
      {
        id: 'ach-1',
        title: 'Unlocked Achievement',
        description: 'An unlocked achievement',
        icon: '🏆',
        category: 'learning' as const,
        points: 100,
        rarity: 'common' as const,
        unlockedAt: new Date().toISOString(),
        progress: 100,
        maxProgress: 100,
        requirements: []
      },
      {
        id: 'ach-2',
        title: 'In Progress Achievement',
        description: 'An achievement in progress',
        icon: '⭐',
        category: 'skill' as const,
        points: 200,
        rarity: 'uncommon' as const,
        unlockedAt: null,
        progress: 50,
        maxProgress: 100,
        requirements: []
      }
    ];

    const mockUserStats = {
      userId: 'user-1',
      totalPoints: 1250,
      level: 8,
      experience: 850,
      experienceToNextLevel: 150,
      achievements: 12,
      badges: 5,
      currentStreak: 7,
      longestStreak: 15
    };

    mockedGamificationService.getAchievements.mockResolvedValue(mockAchievements);
    mockedGamificationService.getUserStats.mockResolvedValue(mockUserStats);

    render(<Achievements />);

    await waitFor(() => {
      expect(screen.getByText('Achievement Summary')).toBeInTheDocument();
    });

    expect(screen.getByText('1 unlocked')).toBeInTheDocument();
    expect(screen.getByText('1 in progress')).toBeInTheDocument();
  });
}); 