import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, PlayCircle, Clock, Award, BookOpen, Target } from 'lucide-react';

export const LearningPath = () => {
  const currentPath = {
    title: 'Full Stack Development',
    description: 'Master modern web development with React, Node.js, and cloud technologies',
    progress: 65,
    totalHours: 120,
    completedHours: 78,
    estimatedCompletion: '3 weeks',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
  };

  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Sarah Chen',
      duration: '8 hours',
      progress: 100,
      status: 'completed',
      rating: 4.8,
      skills: ['React', 'TypeScript'],
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      instructor: 'Mike Johnson',
      duration: '12 hours',
      progress: 75,
      status: 'in-progress',
      rating: 4.6,
      skills: ['Node.js', 'Express', 'MongoDB'],
    },
    {
      id: 3,
      title: 'AWS Cloud Architecture',
      instructor: 'Alex Rodriguez',
      duration: '15 hours',
      progress: 0,
      status: 'upcoming',
      rating: 4.9,
      skills: ['AWS', 'Cloud Computing'],
    },
    {
      id: 4,
      title: 'TypeScript Mastery',
      instructor: 'Emma Wilson',
      duration: '10 hours',
      progress: 0,
      status: 'upcoming',
      rating: 4.7,
      skills: ['TypeScript', 'JavaScript'],
    },
  ];

  const recommendations = [
    {
      title: 'Machine Learning Fundamentals',
      reason: 'High market demand',
      match: 92,
      duration: '20 hours',
      skills: ['Python', 'TensorFlow', 'Scikit-learn'],
    },
    {
      title: 'DevOps with Docker & Kubernetes',
      reason: 'Career advancement',
      match: 88,
      duration: '16 hours',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
    },
    {
      title: 'Data Structures & Algorithms',
      reason: 'Interview preparation',
      match: 85,
      duration: '25 hours',
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-primary" />;
      case 'in-progress': return <PlayCircle className="w-5 h-5 text-secondary" />;
      case 'upcoming': return <Clock className="w-5 h-5 text-muted-foreground" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'in-progress': return 'bg-secondary text-secondary-foreground';
      case 'upcoming': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Current Learning Path</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-poppins font-bold text-foreground mb-2">
                  {currentPath.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {currentPath.description}
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 rounded-lg bg-glass/20">
                    <div className="text-2xl font-bold text-primary">{currentPath.progress}%</div>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-glass/20">
                    <div className="text-2xl font-bold text-secondary">{currentPath.completedHours}h</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-glass/20">
                    <div className="text-2xl font-bold text-accent">{currentPath.estimatedCompletion}</div>
                    <div className="text-sm text-muted-foreground">Time to Complete</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-bold text-primary">{currentPath.progress}%</span>
                  </div>
                  <Progress value={currentPath.progress} className="h-3" />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {currentPath.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Course Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={course.id} className="p-4 rounded-lg bg-glass/20 border border-glass-border/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(course.status)}
                      <div>
                        <h4 className="font-semibold text-foreground">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">★ {course.rating}</div>
                        <div className="text-xs text-muted-foreground">{course.duration}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-bold text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    {course.status === 'completed' && (
                      <Button size="sm" variant="outline" className="flex-1 glass-card">
                        <Award className="w-3 h-3 mr-1" />
                        Certificate
                      </Button>
                    )}
                    {course.status === 'in-progress' && (
                      <Button size="sm" className="flex-1 btn-primary">
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Continue
                      </Button>
                    )}
                    {course.status === 'upcoming' && (
                      <Button size="sm" variant="outline" className="flex-1 glass-card">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Learning Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Recommended Learning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <div key={rec.title} className="p-4 rounded-lg bg-glass/20 border border-glass-border/20 hover:bg-glass/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground">{rec.reason}</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      {rec.match}% match
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{rec.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rec.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button size="sm" className="w-full btn-primary">
                    Add to Path
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 