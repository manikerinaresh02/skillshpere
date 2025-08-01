// Phase 3 Type Definitions

// Collaboration Types
export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  members: GroupMember[];
  maxMembers: number;
  createdAt: string;
  isActive: boolean;
  tags: string[];
  meetingSchedule?: MeetingSchedule[];
}

export interface GroupMember {
  userId: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  contributionScore: number;
  lastActive: string;
}

export interface MeetingSchedule {
  id: string;
  title: string;
  description: string;
  startTime: string;
  duration: number; // in minutes
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
}

export interface LiveSession {
  id: string;
  title: string;
  hostId: string;
  hostName: string;
  participants: SessionParticipant[];
  startTime: string;
  duration: number;
  topic: string;
  isActive: boolean;
  maxParticipants: number;
  sessionType: 'coding' | 'discussion' | 'review' | 'workshop';
}

export interface SessionParticipant {
  userId: string;
  name: string;
  avatar?: string;
  joinedAt: string;
  isActive: boolean;
}

export interface PeerLearningRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  skillId: string;
  skillName: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface ProgressData {
  id: string;
  userId: string;
  skillId: string;
  skillName: string;
  progress: number;
  learningHours: number;
  achievements: string[];
  sharedAt: string;
  isPublic: boolean;
}

// AI Types
export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  steps: LearningStep[];
  estimatedDuration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  aiGenerated: boolean;
  progress: number;
  targetSkills: string[];
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'project' | 'assessment' | 'practice' | 'resource';
  duration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  resources: LearningResource[];
  order: number;
  estimatedImpact: number; // 0-100
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'book' | 'tutorial' | 'exercise';
  url: string;
  duration?: number;
  rating: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface AdaptiveAssessment {
  id: string;
  skillId: string;
  userId: string;
  questions: AdaptiveQuestion[];
  currentDifficulty: 'easy' | 'medium' | 'hard';
  adaptiveAlgorithm: string;
  performanceHistory: PerformanceMetric[];
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLimit: number;
  isCompleted: boolean;
}

export interface AdaptiveQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'coding' | 'scenario';
  options?: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  points: number;
  estimatedTime: number; // in seconds
}

export interface PerformanceMetric {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timestamp: string;
}

export interface SmartRecommendation {
  id: string;
  type: 'course' | 'project' | 'assessment' | 'resource' | 'path';
  title: string;
  description: string;
  confidence: number; // 0-100
  reasoning: string;
  estimatedImpact: number; // 0-100
  timeToComplete: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  userFeedback?: 'helpful' | 'not_helpful' | 'neutral';
}

export interface PredictionResult {
  skillId: string;
  skillName: string;
  currentLevel: number;
  predictedLevel: number;
  timeToTarget: number; // in weeks
  confidence: number; // 0-100
  factors: PredictionFactor[];
  recommendations: string[];
}

export interface PredictionFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  weight: number;
  description: string;
}

export interface CareerPrediction {
  targetRole: string;
  currentFit: number; // 0-100
  timeToAchieve: number; // in months
  requiredSkills: string[];
  missingSkills: string[];
  learningPath: LearningPath;
  confidence: number;
  alternativeRoles: string[];
}

// Analytics Types
export interface SkillProgress {
  skillId: string;
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  hoursSpent: number;
  lastUpdated: string;
}

export interface LearningAnalytics {
  userId: string;
  totalLearningHours: number;
  skillsProgress: SkillProgress[];
  learningStreak: number;
  weeklyGoals: WeeklyGoal[];
  performanceTrends: PerformanceTrend[];
  learningVelocity: number; // hours per week
  skillGaps: SkillGap[];
  timeDistribution: TimeDistribution;
}

export interface WeeklyGoal {
  id: string;
  week: string;
  targetHours: number;
  actualHours: number;
  completed: boolean;
  skills: string[];
}

export interface PerformanceTrend {
  skillId: string;
  skillName: string;
  trend: 'improving' | 'declining' | 'stable';
  changeRate: number; // percentage
  period: string;
  dataPoints: TrendDataPoint[];
}

export interface TrendDataPoint {
  date: string;
  value: number;
  assessmentId?: string;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
  impact: number; // 0-100
}

export interface TimeDistribution {
  skillCategories: CategoryTime[];
  dailyPattern: DailyPattern[];
  weeklyPattern: WeeklyPattern[];
}

export interface CategoryTime {
  category: string;
  hours: number;
  percentage: number;
}

export interface DailyPattern {
  day: string;
  hours: number;
  averageHours: number;
}

export interface WeeklyPattern {
  week: string;
  totalHours: number;
  goalHours: number;
  completionRate: number;
}

export interface SkillCorrelation {
  primarySkill: string;
  correlatedSkills: CorrelatedSkill[];
  correlationStrength: number; // 0-1
  learningImplications: string[];
  confidence: number;
}

export interface CorrelatedSkill {
  skillId: string;
  skillName: string;
  correlationStrength: number;
  relationship: 'positive' | 'negative' | 'neutral';
  explanation: string;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  estimatedSalary: SalaryRange;
  growthPotential: number; // 0-100
  timeToAchieve: number; // in months
  alternativePaths: string[];
  marketDemand: number; // 0-100
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface SalaryRange {
  min: number;
  max: number;
  median: number;
  currency: string;
}

export interface PerformancePrediction {
  skillId: string;
  skillName: string;
  currentPerformance: number;
  predictedPerformance: number;
  confidence: number;
  factors: PredictionFactor[];
  timeline: PredictionTimeline[];
}

export interface PredictionTimeline {
  date: string;
  predictedLevel: number;
  confidence: number;
}

// Gamification Types
export interface Achievement {
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
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type: 'skill_level' | 'learning_hours' | 'streak_days' | 'assessments_passed';
  target: number;
  current: number;
  description: string;
}

export interface Leaderboard {
  id: string;
  title: string;
  type: 'global' | 'skill' | 'group' | 'weekly' | 'monthly';
  participants: LeaderboardEntry[];
  timeFrame: 'daily' | 'weekly' | 'monthly' | 'allTime';
  totalParticipants: number;
  userRank?: number;
  userScore?: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  score: number;
  change: number; // rank change from previous period
  details: LeaderboardDetails;
}

export interface LeaderboardDetails {
  learningHours: number;
  skillsCompleted: number;
  achievements: number;
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'skill' | 'social' | 'milestone' | 'special';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  requirements: BadgeRequirement[];
}

export interface BadgeRequirement {
  type: string;
  target: number;
  current: number;
  description: string;
}

export interface UserStats {
  userId: string;
  totalPoints: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  achievements: number;
  badges: number;
  currentStreak: number;
  longestStreak: number;
  totalLearningHours: number;
  skillsCompleted: number;
  rank: number;
}

// Filter and Query Types
export interface StudyGroupFilters {
  category?: string;
  isActive?: boolean;
  maxMembers?: number;
  tags?: string[];
  search?: string;
}

export interface CollaborationFilters {
  skillId?: string;
  level?: string;
  location?: string;
  availability?: string;
}

export interface AnalyticsFilters {
  timeFrame: 'day' | 'week' | 'month' | 'year' | 'all';
  skills?: string[];
  categories?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface GamificationFilters {
  category?: string;
  rarity?: string;
  unlocked?: boolean;
  progress?: 'all' | 'in_progress' | 'completed';
} 