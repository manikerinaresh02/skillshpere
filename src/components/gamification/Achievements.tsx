import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Trophy,
  Star,
  Zap,
  Target,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Define types locally to avoid import issues
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'social' | 'skill' | 'streak' | 'milestone';
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  requirements: {
    type: string;
    target: number;
    current: number;
    description: string;
  }[];
}

interface UserStats {
  userId: string;
  totalPoints: number;
  level: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  currentStreak: number;
  longestStreak: number;
  totalLearningHours: number;
  assessmentsCompleted: number;
  skillsMastered: number;
  rank: string;
  rankProgress: number;
  nextRank: string;
  pointsToNextRank: number;
}

export const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'learning' | 'social' | 'skill' | 'streak' | 'milestone'>('all');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use mock data directly instead of service call
        const mockAchievements: Achievement[] = [
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
            unlockedAt: '2024-01-20T15:30:00Z',
            progress: 100,
            maxProgress: 100,
            requirements: [
              {
                type: 'learning_streak',
                target: 7,
                current: 7,
                description: 'Learn for 7 consecutive days'
              }
            ]
          },
          {
            id: 'ach-3',
            title: 'Skill Master',
            description: 'Master 5 different skills',
            icon: '🏆',
            category: 'skill',
            points: 200,
            rarity: 'epic',
            progress: 60,
            maxProgress: 100,
            requirements: [
              {
                type: 'skills_mastered',
                target: 5,
                current: 3,
                description: 'Master 5 different skills'
              }
            ]
          },
          {
            id: 'ach-4',
            title: 'Social Butterfly',
            description: 'Join 3 study groups',
            icon: '🦋',
            category: 'social',
            points: 75,
            rarity: 'common',
            progress: 33,
            maxProgress: 100,
            requirements: [
              {
                type: 'study_groups_joined',
                target: 3,
                current: 1,
                description: 'Join 3 study groups'
              }
            ]
          }
        ];
        
        setAchievements(mockAchievements);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setError('Failed to load achievements. Please try again.');
      }
    };

    const fetchUserStats = async () => {
      try {
        // Use mock data directly instead of service call
        const mockUserStats: UserStats = {
          userId: 'current-user',
          totalPoints: 425,
          level: 8,
          achievementsUnlocked: 2,
          totalAchievements: 4,
          currentStreak: 12,
          longestStreak: 15,
          totalLearningHours: 156,
          assessmentsCompleted: 8,
          skillsMastered: 3,
          rank: 'Apprentice',
          rankProgress: 75,
          nextRank: 'Scholar',
          pointsToNextRank: 75
        };
        
        setUserStats(mockUserStats);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
    fetchUserStats();
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'text-purple-600 bg-purple-100';
      case 'epic':
        return 'text-blue-600 bg-blue-100';
      case 'rare':
        return 'text-green-600 bg-green-100';
      case 'common':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning':
        return <BookOpen className="w-4 h-4" />;
      case 'social':
        return <Users className="w-4 h-4" />;
      case 'skill':
        return <Target className="w-4 h-4" />;
      case 'streak':
        return <Zap className="w-4 h-4" />;
      case 'milestone':
        return <Award className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const filteredAchievements = achievements.filter(achievement =>
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const inProgressAchievements = achievements.filter(a => !a.unlockedAt && a.progress > 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-primary" />
            <span>Achievements</span>
          </h2>
          <p className="text-muted-foreground">Track your progress and unlock achievements</p>
        </div>
      </div>

      {/* User Stats */}
      {userStats && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.level}</div>
                  <div className="text-sm text-muted-foreground">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{userStats.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{userStats.achievements}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Experience to Next Level</span>
                  <span>{userStats.experience}/{userStats.experience + userStats.experienceToNextLevel}</span>
                </div>
                <Progress value={(userStats.experience / (userStats.experience + userStats.experienceToNextLevel)) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {[
          { value: 'all', label: 'All', icon: <Trophy className="w-4 h-4" /> },
          { value: 'learning', label: 'Learning', icon: <BookOpen className="w-4 h-4" /> },
          { value: 'social', label: 'Social', icon: <Users className="w-4 h-4" /> },
          { value: 'skill', label: 'Skill', icon: <Target className="w-4 h-4" /> },
          { value: 'streak', label: 'Streak', icon: <Zap className="w-4 h-4" /> },
          { value: 'milestone', label: 'Milestone', icon: <Award className="w-4 h-4" /> }
        ].map((tab) => (
          <Badge
            key={tab.value}
            variant={selectedCategory === tab.value ? 'default' : 'outline'}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setSelectedCategory(tab.value as any)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Badge>
        ))}
      </div>

      {/* Achievement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{unlockedAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Unlocked</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{inProgressAchievements.length}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Completion</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`glass-card transition-all duration-300 ${
              achievement.unlockedAt ? 'ring-2 ring-green-500/20' : ''
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(achievement.category)}
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium">{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                
                {achievement.unlockedAt && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">Requirements:</div>
                  {achievement.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="flex items-center justify-between text-xs">
                      <span>{req.description}</span>
                      <span className={req.current >= req.target ? 'text-green-600' : 'text-muted-foreground'}>
                        {req.current}/{req.target}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Points</span>
                  <span className="text-sm font-bold text-primary">{achievement.points}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No achievements found</h3>
          <p className="text-muted-foreground">
            {selectedCategory === 'all' 
              ? 'Start learning to unlock achievements'
              : `No ${selectedCategory} achievements available`
            }
          </p>
        </div>
      )}
    </div>
  );
}; 