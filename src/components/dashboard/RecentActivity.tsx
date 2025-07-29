import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Award, BookOpen, Target, TrendingUp, Users, Building } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'course_completed',
      title: 'Completed Advanced React Patterns',
      description: 'Finished the course with 95% score',
      time: '2 hours ago',
      icon: Award,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      id: 2,
      type: 'skill_updated',
      title: 'Updated React.js proficiency',
      description: 'Skill level increased from 80% to 85%',
      time: '4 hours ago',
      icon: TrendingUp,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      id: 3,
      type: 'job_applied',
      title: 'Applied to Senior Developer role',
      description: 'TechCorp • San Francisco, CA',
      time: '1 day ago',
      icon: Building,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      id: 4,
      type: 'learning_started',
      title: 'Started Node.js Backend Development',
      description: 'Course by Mike Johnson • 12 hours',
      time: '2 days ago',
      icon: BookOpen,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/20',
    },
    {
      id: 5,
      type: 'achievement_unlocked',
      title: 'Unlocked "React Expert" badge',
      description: 'Completed 5 React-related courses',
      time: '3 days ago',
      icon: Award,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      id: 6,
      type: 'network_connected',
      title: 'Connected with Sarah Chen',
      description: 'Senior Developer at TechCorp',
      time: '4 days ago',
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
  ];

  const achievements = [
    {
      title: 'React Expert',
      description: 'Completed 5 React courses',
      icon: '⭐',
      progress: 100,
      unlocked: true,
    },
    {
      title: 'Full Stack Developer',
      description: 'Mastered frontend and backend',
      icon: '🚀',
      progress: 75,
      unlocked: false,
    },
    {
      title: 'Cloud Architect',
      description: 'AWS and cloud technologies',
      icon: '☁️',
      progress: 45,
      unlocked: false,
    },
    {
      title: 'ML Enthusiast',
      description: 'Machine learning fundamentals',
      icon: '🤖',
      progress: 20,
      unlocked: false,
    },
  ];

  const getActivityIcon = (activity: any) => {
    const IconComponent = activity.icon;
    return (
      <div className={`p-2 rounded-lg ${activity.bgColor} ${activity.color}`}>
        <IconComponent className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-glass/20 transition-all duration-300"
                >
                  {getActivityIcon(activity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-glass/20 border-glass-border/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-2xl ${achievement.unlocked ? 'opacity-100' : 'opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium text-primary">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              achievement.unlocked ? 'bg-primary' : 'bg-muted-foreground'
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-primary text-primary-foreground">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Courses Completed', value: '8', icon: BookOpen, color: 'text-primary' },
          { label: 'Skills Mastered', value: '12', icon: Target, color: 'text-secondary' },
          { label: 'Achievements', value: '3', icon: Award, color: 'text-accent' },
          { label: 'Network Size', value: '45', icon: Users, color: 'text-muted-foreground' },
        ].map((stat, index) => (
          <Card key={stat.label} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-glass/20 ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-poppins font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Update Profile', description: 'Add new skills and experience', action: 'Update' },
                { title: 'Find Jobs', description: 'Browse matching opportunities', action: 'Search' },
                { title: 'Start Learning', description: 'Continue your learning path', action: 'Continue' },
              ].map((action, index) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 glass-card hover:bg-glass/30"
                >
                  <h4 className="font-semibold text-foreground">{action.title}</h4>
                  <p className="text-sm text-muted-foreground text-left">{action.description}</p>
                  <span className="text-primary font-medium">{action.action} →</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 