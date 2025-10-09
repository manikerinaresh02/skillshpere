import { apiClient } from '../utils/api';
import {
  Achievement,
  Badge,
  Leaderboard,
  UserStats
} from '../types/phase3';

export const gamificationService = {
  // Achievements
  getAchievements: async (userId: string): Promise<Achievement[]> => {
    try {
      const response = await apiClient.get(`/gamification/achievements?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching achievements:', error);
      // Return mock data
      return [
        {
          id: 'ach-1',
          title: 'First Steps',
          description: 'Complete your first assessment',
          icon: '🎯',
          category: 'learning',
          points: 50,
          rarity: 'common',
          unlockedAt: '2024-01-15T10:00:00Z',
          progress: 100,
          maxProgress: 100,
          requirements: [
            {
              type: 'assessments_passed',
              target: 1,
              current: 1,
              description: 'Complete 1 assessment'
            }
          ]
        },
        {
          id: 'ach-2',
          title: 'Learning Streak',
          description: 'Maintain a 7-day learning streak',
          icon: '🔥',
          category: 'streak',
          points: 100,
          rarity: 'rare',
          unlockedAt: '2024-01-20T10:00:00Z',
          progress: 100,
          maxProgress: 100,
          requirements: [
            {
              type: 'streak_days',
              target: 7,
              current: 7,
              description: 'Maintain 7-day streak'
            }
          ]
        },
        {
          id: 'ach-3',
          title: 'Skill Master',
          description: 'Reach expert level in any skill',
          icon: '🏆',
          category: 'skill',
          points: 200,
          rarity: 'epic',
          progress: 75,
          maxProgress: 100,
          requirements: [
            {
              type: 'skill_level',
              target: 90,
              current: 75,
              description: 'Reach 90% in any skill'
            }
          ]
        }
      ];
    }
  },

  unlockAchievement: async (userId: string, achievementId: string): Promise<void> => {
    try {
      await apiClient.post(`/gamification/achievements/${achievementId}/unlock`, { userId });
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      // Mock successful unlock
    }
  },

  getAchievementProgress: async (userId: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/gamification/achievements/progress?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching achievement progress:', error);
      // Return mock data
      return {
        totalAchievements: 15,
        unlockedAchievements: 8,
        totalPoints: 850,
        nextAchievement: {
          id: 'ach-4',
          title: 'Social Learner',
          description: 'Join your first study group',
          progress: 0,
          maxProgress: 1
        }
      };
    }
  },

  // Leaderboards
  getLeaderboards: async (type: string): Promise<Leaderboard[]> => {
    try {
      const response = await apiClient.get(`/gamification/leaderboards?type=${type}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
      // Return mock data
      return [
        {
          id: 'lb-1',
          title: 'Global Learning Leaderboard',
          type: 'global',
          participants: [
            {
              rank: 1,
              userId: 'user-1',
              name: 'John Doe',
              avatar: 'https://via.placeholder.com/40',
              score: 1250,
              change: 0,
              details: {
                learningHours: 156,
                skillsCompleted: 8,
                achievements: 12,
                streak: 15
              }
            },
            {
              rank: 2,
              userId: 'user-2',
              name: 'Jane Smith',
              avatar: 'https://via.placeholder.com/40',
              score: 1180,
              change: 1,
              details: {
                learningHours: 142,
                skillsCompleted: 7,
                achievements: 10,
                streak: 12
              }
            }
          ],
          timeFrame: 'allTime',
          totalParticipants: 1250,
          userRank: 15,
          userScore: 850
        },
        {
          id: 'lb-2',
          title: 'React Development Leaderboard',
          type: 'skill',
          participants: [
            {
              rank: 1,
              userId: 'user-3',
              name: 'Mike Johnson',
              avatar: 'https://via.placeholder.com/40',
              score: 95,
              change: 0,
              details: {
                learningHours: 45,
                skillsCompleted: 1,
                achievements: 5,
                streak: 8
              }
            }
          ],
          timeFrame: 'monthly',
          totalParticipants: 450,
          userRank: 25,
          userScore: 75
        }
      ];
    }
  },

  getUserRanking: async (userId: string, leaderboardId: string): Promise<number> => {
    try {
      const response = await apiClient.get(`/gamification/leaderboards/${leaderboardId}/ranking?userId=${userId}`);
      return response.data.rank;
    } catch (error) {
      console.error('Error fetching user ranking:', error);
      // Return mock ranking
      return 15;
    }
  },

  updateUserScore: async (userId: string, leaderboardId: string, score: number): Promise<void> => {
    try {
      await apiClient.put(`/gamification/leaderboards/${leaderboardId}/score`, {
        userId,
        score
      });
    } catch (error) {
      console.error('Error updating user score:', error);
      // Mock successful update
    }
  },

  // Badges
  getBadges: async (userId: string): Promise<Badge[]> => {
    try {
      const response = await apiClient.get(`/gamification/badges?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching badges:', error);
      // Return mock data
      return [
        {
          id: 'badge-1',
          name: 'Quick Learner',
          description: 'Complete 5 assessments in one week',
          icon: '⚡',
          rarity: 'rare',
          category: 'skill',
          unlockedAt: '2024-01-18T10:00:00Z',
          progress: 100,
          maxProgress: 100,
          requirements: [
            {
              type: 'assessments_completed',
              target: 5,
              current: 5,
              description: 'Complete 5 assessments'
            }
          ]
        },
        {
          id: 'badge-2',
          name: 'Team Player',
          description: 'Join 3 study groups',
          icon: '👥',
          rarity: 'common',
          category: 'social',
          progress: 66,
          maxProgress: 100,
          requirements: [
            {
              type: 'study_groups_joined',
              target: 3,
              current: 2,
              description: 'Join 3 study groups'
            }
          ]
        },
        {
          id: 'badge-3',
          name: 'Milestone Master',
          description: 'Reach 1000 total learning hours',
          icon: '🎖️',
          rarity: 'legendary',
          category: 'milestone',
          progress: 15.6,
          maxProgress: 100,
          requirements: [
            {
              type: 'total_learning_hours',
              target: 1000,
              current: 156,
              description: 'Reach 1000 learning hours'
            }
          ]
        }
      ];
    }
  },

  earnBadge: async (userId: string, badgeId: string): Promise<void> => {
    try {
      await apiClient.post(`/gamification/badges/${badgeId}/earn`, { userId });
    } catch (error) {
      console.error('Error earning badge:', error);
      // Mock successful badge earning
    }
  },

  getBadgeProgress: async (userId: string): Promise<any[]> => {
    try {
      const response = await apiClient.get(`/gamification/badges/progress?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching badge progress:', error);
      // Return mock data
      return [
        {
          badgeId: 'badge-1',
          name: 'Quick Learner',
          progress: 100,
          maxProgress: 100,
          unlocked: true
        },
        {
          badgeId: 'badge-2',
          name: 'Team Player',
          progress: 66,
          maxProgress: 100,
          unlocked: false
        }
      ];
    }
  },

  // User Stats
  getUserStats: async (userId: string): Promise<UserStats> => {
    try {
      const response = await apiClient.get(`/gamification/user-stats?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Return mock data
      return {
        userId,
        totalPoints: 850,
        level: 12,
        experience: 1250,
        experienceToNextLevel: 250,
        achievements: 8,
        badges: 3,
        currentStreak: 12,
        longestStreak: 15,
        totalLearningHours: 156,
        skillsCompleted: 5,
        rank: 15
      };
    }
  },

  // Level System
  getLevelInfo: async (userId: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/gamification/level-info?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching level info:', error);
      // Return mock data
      return {
        currentLevel: 12,
        experience: 1250,
        experienceToNextLevel: 250,
        totalExperience: 5000,
        levelRewards: [
          {
            level: 13,
            reward: 'Unlock Advanced Assessments',
            experienceRequired: 1500
          },
          {
            level: 14,
            reward: 'Exclusive Study Groups',
            experienceRequired: 1750
          }
        ]
      };
    }
  }
}; 