import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  TrendingUp,
  Target,
  Star,
  BookOpen,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Users,
  BookOpen as BookOpenIcon,
  AlertCircle
} from 'lucide-react';
import { LearningAnalytics as LearningAnalyticsType } from '../../types/phase3';

// Define types locally to avoid import issues
interface SkillProgress {
  skillId: string;
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  hoursSpent: number;
  lastUpdated: string;
}

interface WeeklyGoal {
  week: string;
  targetHours: number;
  actualHours: number;
  completed: boolean;
}

interface PerformanceTrend {
  date: string;
  score: number;
  hoursSpent: number;
  assessmentsTaken: number;
}

interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
}

interface TimeDistribution {
  coding: number;
  reading: number;
  watching: number;
  practicing: number;
  assessment: number;
}

interface LearningAnalytics {
  userId: string;
  totalLearningHours: number;
  skillsProgress: SkillProgress[];
  learningStreak: number;
  weeklyGoals: WeeklyGoal[];
  performanceTrends: PerformanceTrend[];
  learningVelocity: number;
  skillGaps: SkillGap[];
  timeDistribution: TimeDistribution;
}

export const LearningAnalytics = () => {
  const [analytics, setAnalytics] = useState<LearningAnalyticsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('30');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        
        // Use mock data directly instead of service call
        const mockAnalytics: LearningAnalyticsType = {
          userId: 'current-user',
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
              week: '2024-W01',
              targetHours: 10,
              actualHours: 12,
              completed: true,
              skills: ['react', 'javascript']
            },
            {
              id: 'goal-2',
              week: '2024-W02',
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
              { week: '2024-W01', totalHours: 18, goalHours: 15, completionRate: 120 },
              { week: '2024-W02', totalHours: 22, goalHours: 15, completionRate: 147 },
              { week: '2024-W03', totalHours: 12, goalHours: 15, completionRate: 80 }
            ]
          }
        };
        
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getStreakColor = (streak: number) => {
    if (streak >= 21) return 'text-purple-600';
    if (streak >= 14) return 'text-blue-600';
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 21) return '🔥';
    if (streak >= 14) return '⚡';
    if (streak >= 7) return '🌟';
    if (streak >= 3) return '✨';
    return '📚';
  };

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

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No analytics data available</h3>
        <p className="text-muted-foreground">Complete some learning activities to see your analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span>Learning Analytics</span>
          </h2>
          <p className="text-muted-foreground">Track your learning progress and performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{analytics.totalLearningHours}h</div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">{getStreakIcon(analytics.learningStreak)}</div>
              <div className={`text-2xl font-bold ${getStreakColor(analytics.learningStreak)}`}>{analytics.learningStreak} days</div>
              <div className="text-sm text-muted-foreground">Learning Streak</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{analytics.learningVelocity}x</div>
              <div className="text-sm text-muted-foreground">Learning Velocity</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{analytics.skillsProgress.length}</div>
              <div className="text-sm text-muted-foreground">Skills Tracked</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Skills Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Skills Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.skillsProgress.map((skill) => (
              <div key={skill.skillId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{skill.skillName}</span>
                  <span className="text-sm text-muted-foreground">{skill.currentLevel}%</span>
                </div>
                <Progress value={skill.currentLevel} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Target: {skill.targetLevel}%</span>
                  <span>{skill.hoursSpent}h spent</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Trends */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.performanceTrends.map((trend) => (
              <div key={trend.skillId} className="flex items-center justify-between p-3 rounded-lg border border-glass-border/20">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    trend.trend === 'improving' ? 'bg-green-500' : 
                    trend.trend === 'declining' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <span className="font-medium">{trend.skillName}</span>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    trend.trend === 'improving' ? 'text-green-600' : 
                    trend.trend === 'declining' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {trend.changeRate > 0 ? '+' : ''}{trend.changeRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">{trend.period}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Gaps */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              <span>Skill Gaps</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.skillGaps.map((gap) => (
              <div key={gap.skillId} className="p-4 rounded-lg border border-glass-border/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{gap.skillName}</span>
                  <Badge variant={gap.priority === 'high' ? 'destructive' : gap.priority === 'medium' ? 'default' : 'secondary'}>
                    {gap.priority} priority
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Level</span>
                    <span>{gap.currentLevel}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Required Level</span>
                    <span>{gap.requiredLevel}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Gap</span>
                    <span className="text-red-600 font-semibold">{gap.gap}% gap</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Time Distribution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-primary" />
              <span>Time Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.timeDistribution.skillCategories.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-3 rounded-lg border border-glass-border/20">
                <span className="font-medium">{category.category}</span>
                <div className="text-right">
                  <div className="font-semibold">{category.hours}h</div>
                  <div className="text-xs text-muted-foreground">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 