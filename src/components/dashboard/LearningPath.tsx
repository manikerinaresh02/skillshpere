import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, PlayCircle, Clock, Award, BookOpen, Target, TrendingUp, Calendar, Users, AlertCircle } from 'lucide-react';

// Define types locally to avoid import issues
interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'project' | 'assessment' | 'practice' | 'resource';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  progress: number;
  resources: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'practice';
  }[];
  prerequisites: string[];
  skills: string[];
}

interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  steps: LearningStep[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  aiGenerated: boolean;
  progress: number;
  targetSkills: string[];
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export const LearningPath = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use mock data directly instead of service call
        const mockPaths: LearningPath[] = [
          {
            id: 'path-1',
            userId: 'current-user',
            title: 'React to Full-Stack Developer',
            description: 'A comprehensive path to become a full-stack developer with React',
            steps: [
              {
                id: 'step-1',
                title: 'React Fundamentals',
                description: 'Learn the basics of React including components, props, and state',
                type: 'course',
                duration: 10,
                difficulty: 'beginner',
                completed: true,
                progress: 100,
                resources: [
                  {
                    title: 'React Official Documentation',
                    url: 'https://react.dev',
                    type: 'documentation'
                  }
                ],
                prerequisites: [],
                skills: ['react', 'javascript']
              },
              {
                id: 'step-2',
                title: 'Build a Todo App',
                description: 'Create a simple todo application to practice React concepts',
                type: 'project',
                duration: 5,
                difficulty: 'beginner',
                completed: false,
                progress: 60,
                resources: [
                  {
                    title: 'Todo App Tutorial',
                    url: '#',
                    type: 'video'
                  }
                ],
                prerequisites: ['step-1'],
                skills: ['react', 'javascript', 'html', 'css']
              },
              {
                id: 'step-3',
                title: 'React Hooks Deep Dive',
                description: 'Master advanced React hooks and custom hooks',
                type: 'course',
                duration: 8,
                difficulty: 'intermediate',
                completed: false,
                progress: 0,
                resources: [
                  {
                    title: 'React Hooks Guide',
                    url: '#',
                    type: 'article'
                  }
                ],
                prerequisites: ['step-1', 'step-2'],
                skills: ['react', 'hooks', 'javascript']
              }
            ],
            estimatedDuration: 50,
            difficulty: 'intermediate',
            aiGenerated: true,
            progress: 35,
            targetSkills: ['react', 'javascript', 'nodejs'],
            prerequisites: ['javascript-basics'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: 'path-2',
            userId: 'current-user',
            title: 'Senior Frontend Engineer',
            description: 'Advanced frontend development with modern tools and best practices',
            steps: [
              {
                id: 'step-4',
                title: 'TypeScript Mastery',
                description: 'Learn TypeScript for better type safety and developer experience',
                type: 'course',
                duration: 12,
                difficulty: 'intermediate',
                completed: false,
                progress: 25,
                resources: [
                  {
                    title: 'TypeScript Handbook',
                    url: '#',
                    type: 'documentation'
                  }
                ],
                prerequisites: ['javascript-basics'],
                skills: ['typescript', 'javascript']
              }
            ],
            estimatedDuration: 40,
            difficulty: 'advanced',
            aiGenerated: true,
            progress: 10,
            targetSkills: ['react', 'typescript', 'testing'],
            prerequisites: ['react-basics'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        
        setLearningPaths(mockPaths);
        if (mockPaths.length > 0) {
          setCurrentPath(mockPaths[0]);
          setSelectedPath(mockPaths[0].id);
        }
      } catch (error) {
        console.error('Error fetching learning paths:', error);
        setError('Failed to load learning paths. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLearningPaths();
  }, []);

  const handlePathSelect = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (path) {
      setCurrentPath(path);
      setSelectedPath(pathId);
    }
  };

  const handleStepComplete = async (stepId: string) => {
    if (!currentPath) return;

    try {
      // This function is not implemented in the new mock data,
      // so it will not have an effect on the mock data.
      // In a real scenario, you would call an AI service here.
      console.log(`Attempting to complete step: ${stepId}`);
      // For now, we'll just update the progress of the current path
      // to simulate completion of the last step.
      if (currentPath.steps.length > 0) {
        const lastStep = currentPath.steps[currentPath.steps.length - 1];
        if (lastStep.id === stepId) {
          const updatedPath = { ...currentPath, progress: 100 };
          setCurrentPath(updatedPath);
          setLearningPaths(prev => prev.map(p => p.id === updatedPath.id ? updatedPath : p));
        }
      }
    } catch (error) {
      console.error('Error updating learning path:', error);
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'project':
        return <Target className="w-4 h-4" />;
      case 'assessment':
        return <Award className="w-4 h-4" />;
      case 'practice':
        return <PlayCircle className="w-4 h-4" />;
      case 'resource':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Learning Paths</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span>Learning Paths</span>
          </h2>
          <p className="text-muted-foreground">AI-powered personalized learning journeys</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Paths List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Paths</h3>
          <div className="space-y-3">
            {learningPaths.map((path) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  className={`glass-card cursor-pointer transition-all duration-300 ${
                    selectedPath === path.id ? 'ring-2 ring-primary' : 'hover:bg-glass/20'
                  }`}
                  onClick={() => handlePathSelect(path.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{path.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{path.description}</p>
                        </div>
                        <Badge variant="outline" className={getDifficultyColor(path.difficulty)}>
                          {path.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{path.estimatedDuration}h</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{path.steps.length} steps</span>
                        </div>
                      </div>

                      {path.aiGenerated && (
                        <Badge variant="secondary" className="text-xs">
                          AI Generated
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Path Details */}
        <div className="lg:col-span-2">
          {currentPath ? (
            <div className="space-y-6">
              {/* Path Overview */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{currentPath.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{currentPath.description}</p>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(currentPath.difficulty)}>
                      {currentPath.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{currentPath.progress}%</div>
                      <div className="text-sm text-muted-foreground">Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{currentPath.estimatedDuration}h</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{currentPath.steps.length}</div>
                      <div className="text-sm text-muted-foreground">Steps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {currentPath.steps.filter(s => s.completed).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span>{currentPath.progress}%</span>
                    </div>
                    <Progress value={currentPath.progress} className="h-3" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {currentPath.targetSkills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Steps */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Learning Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentPath.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          step.completed 
                            ? 'border-green-200 bg-green-50/20' 
                            : 'border-glass-border/20 hover:bg-glass/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-medium">{index + 1}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                {getStepIcon(step.type)}
                                <h4 className="font-semibold text-foreground">{step.title}</h4>
                                <Badge variant="outline" className={getDifficultyColor(step.difficulty)}>
                                  {step.difficulty}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{step.duration}h</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Target className="w-3 h-3" />
                                  <span>{step.progress}% complete</span>
                                </div>
                              </div>

                              {step.resources.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Resources:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {step.resources.slice(0, 3).map((resource, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        {resource.title}
                                      </Badge>
                                    ))}
                                    {step.resources.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{step.resources.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {!step.completed && (
                            <Button
                              size="sm"
                              onClick={() => handleStepComplete(step.id)}
                              className="flex-shrink-0"
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Start
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Learning Path</h3>
              <p className="text-muted-foreground">
                Choose a learning path from the list to view detailed steps and progress
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 