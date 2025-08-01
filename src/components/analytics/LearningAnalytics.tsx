import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Target,
  Award,
  Calendar,
  Activity,
  Users,
  BookOpen,
  Zap,
  AlertCircle
} from 'lucide-react';

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
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState('30d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use mock data directly instead of service call
        const mockAnalytics: LearningAnalytics = {
          userId: 'current-user',
          totalLearningHours: 156,
          skillsProgress: [
            {
              skillId: 'react',
              skillName: 'React Development',
              currentLevel: 75,
              targetLevel: 90,
              hoursSpent: 45,
              lastUpdated: new Date().toISOString()
            },
            {
              skillId: 'javascript',
              skillName: 'JavaScript',
              currentLevel: 85,
              targetLevel: 95,
              hoursSpent: 60,
              lastUpdated: new Date().toISOString()
            },
            {
              skillId: 'typescript',
              skillName: 'TypeScript',
              currentLevel: 60,
              targetLevel: 85,
              hoursSpent: 25,
              lastUpdated: new Date().toISOString()
            }
          ],
          learningStreak: 12,
          weeklyGoals: [
            {
              week: '2024-01-01',
              targetHours: 10,
              actualHours: 12,
              completed: true
            },
            {
              week: '2024-01-08',
              targetHours: 10,
              actualHours: 8,
              completed: false
            }
          ],
          performanceTrends: [
            {
              date: '2024-01-01',
              score: 85,
              hoursSpent: 12,
              assessmentsTaken: 2
            },
            {
              date: '2024-01-08',
              score: 88,
              hoursSpent: 8,
              assessmentsTaken: 1
            }
          ],
          learningVelocity: 8.5,
          skillGaps: [
            {
              skillId: 'system-design',
              skillName: 'System Design',
              currentLevel: 30,
              requiredLevel: 70,
              gap: 40,
              priority: 'high'
            },
            {
              skillId: 'testing',
              skillName: 'Testing',
              currentLevel: 50,
              requiredLevel: 80,
              gap: 30,
              priority: 'medium'
            }
          ],
          timeDistribution: {
            coding: 40,
            reading: 25,
            watching: 20,
            practicing: 10,
            assessment: 5
          }
        };
        
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeFrame]);

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-orange-600';
    if (streak >= 7) return 'text-green-600';
    return 'text-blue-600';
  };

  const getVelocityColor = (velocity: number) => {
    if (velocity >= 10) return 'text-green-600';
    if (velocity >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
        <p className="text-muted-foreground">Start learning to see your analytics</p>
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
          <p className="text-muted-foreground">Track your learning progress and insights</p>
        </div>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Learning Hours</p>
                  <p className="text-2xl font-bold text-foreground">{analytics.totalLearningHours}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Streak</p>
                  <p className={`text-2xl font-bold ${getStreakColor(analytics.learningStreak)}`}>
                    {analytics.learningStreak} days
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Velocity</p>
                  <p className={`text-2xl font-bold ${getVelocityColor(analytics.learningVelocity)}`}>
                    {analytics.learningVelocity}h/week
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Skills in Progress</p>
                  <p className="text-2xl font-bold text-foreground">{analytics.skillsProgress.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Skills Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Skills Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.skillsProgress.map((skill, index) => (
                <div key={skill.skillId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{skill.skillName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {skill.hoursSpent}h • {skill.currentLevel}% complete
                      </p>
                    </div>
                    <Badge variant="outline">{skill.currentLevel}%</Badge>
                  </div>
                  <Progress value={skill.currentLevel} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Trends */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.performanceTrends.map((trend, index) => (
                <div key={trend.date} className="p-4 rounded-lg border border-glass-border/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{trend.date}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={trend.score >= 80 ? 'default' : trend.score >= 70 ? 'secondary' : 'destructive'}
                      >
                        Score: {trend.score}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Hours: {trend.hoursSpent}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Assessments: {trend.assessmentsTaken}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Gaps */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Skill Gaps</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.skillGaps.map((gap, index) => (
                <div key={gap.skillId} className="p-4 rounded-lg border border-glass-border/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{gap.skillName}</h4>
                    <Badge
                      variant={gap.priority === 'high' ? 'destructive' : gap.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {gap.priority} priority
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current Level</span>
                      <span>{gap.currentLevel}%</span>
                    </div>
                    <Progress value={gap.currentLevel} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span>Required Level</span>
                      <span>{gap.requiredLevel}%</span>
                    </div>
                    <Progress value={gap.requiredLevel} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span>Gap</span>
                      <span className="font-semibold text-red-600">{gap.gap}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Impact</span>
                      <span>{gap.impact}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Time Distribution */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Time Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(analytics.timeDistribution).map(([category, hours]) => (
                  <div key={category} className="p-4 rounded-lg border border-glass-border/20">
                    <h4 className="font-semibold mb-2">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Hours</span>
                        <span>{hours}h</span>
                      </div>
                      <Progress value={hours} className="h-2" />
                      <div className="text-sm text-muted-foreground">{hours}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 