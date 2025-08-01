import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  TrendingUp,
  Clock,
  Target,
  Star,
  BookOpen,
  Code,
  Award,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  PlayCircle
} from 'lucide-react';

// Define types locally to avoid import issues
interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'project' | 'assessment' | 'resource' | 'path';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  confidence: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  marketValue: number;
  relatedSkills: string[];
  userFeedback?: 'helpful' | 'not_helpful';
  aiGenerated: boolean;
}

interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  steps: any[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  aiGenerated: boolean;
  progress: number;
  targetSkills: string[];
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export const LearningRecommendations = () => {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'course' | 'project' | 'assessment' | 'resource' | 'path'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use mock data directly
        const mockRecommendations: SmartRecommendation[] = [
          {
            id: 'rec-1',
            title: 'Advanced React Patterns',
            description: 'Master advanced React patterns including compound components, render props, and custom hooks',
            type: 'course',
            category: 'Frontend Development',
            difficulty: 'advanced',
            estimatedTime: 15,
            confidence: 0.95,
            reason: 'Based on your strong React fundamentals and recent assessment scores',
            priority: 'high',
            marketValue: 120000,
            relatedSkills: ['react', 'typescript', 'hooks'],
            aiGenerated: true
          },
          {
            id: 'rec-2',
            title: 'Build a Full-Stack E-commerce App',
            description: 'Create a complete e-commerce application with React, Node.js, and MongoDB',
            type: 'project',
            category: 'Full Stack Development',
            difficulty: 'intermediate',
            estimatedTime: 25,
            confidence: 0.88,
            reason: 'Perfect project to showcase your full-stack skills',
            priority: 'high',
            marketValue: 110000,
            relatedSkills: ['react', 'nodejs', 'mongodb'],
            aiGenerated: true
          }
        ];
        
        const mockPaths: LearningPath[] = [
          {
            id: 'path-1',
            userId: 'current-user',
            title: 'React to Full-Stack Developer',
            description: 'A comprehensive path to become a full-stack developer with React',
            steps: [],
            estimatedDuration: 50,
            difficulty: 'intermediate',
            aiGenerated: true,
            progress: 0,
            targetSkills: ['react', 'javascript', 'nodejs'],
            prerequisites: ['javascript-basics'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        
        setRecommendations(mockRecommendations);
        setLearningPaths(mockPaths);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load recommendations. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFeedback = async (recommendationId: string, feedback: 'helpful' | 'not_helpful') => {
    try {
      console.log(`Feedback received for recommendation ${recommendationId}: ${feedback}`);
      setRecommendations(prev => prev.map(rec =>
        rec.id === recommendationId
          ? { ...rec, userFeedback: feedback }
          : rec
      ));
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'project':
        return <Code className="w-4 h-4" />;
      case 'assessment':
        return <Target className="w-4 h-4" />;
      case 'resource':
        return <Star className="w-4 h-4" />;
      case 'path':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
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

  const filteredRecommendations = recommendations.filter(rec =>
    selectedType === 'all' || rec.type === selectedType
  );

  if (error) {
    return (
      <div className="space-y-6 text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error Loading Recommendations</h3>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

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
            <Brain className="w-6 h-6 text-primary" />
            <span>AI-Powered Recommendations</span>
          </h2>
          <p className="text-muted-foreground">Personalized learning recommendations based on your profile</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'course', 'project', 'assessment', 'resource', 'path'].map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(type as any)}
            className="capitalize"
          >
            {getTypeIcon(type)}
            <span className="ml-2">{type}</span>
          </Button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((recommendation) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(recommendation.type)}
                    <Badge variant="outline" className={getDifficultyColor(recommendation.difficulty)}>
                      {recommendation.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp
                      className={`w-4 h-4 cursor-pointer ${
                        recommendation.userFeedback === 'helpful' ? 'text-green-500' : 'text-muted-foreground'
                      }`}
                      onClick={() => handleFeedback(recommendation.id, 'helpful')}
                    />
                    <ThumbsDown
                      className={`w-4 h-4 cursor-pointer ${
                        recommendation.userFeedback === 'not_helpful' ? 'text-red-500' : 'text-muted-foreground'
                      }`}
                      onClick={() => handleFeedback(recommendation.id, 'not_helpful')}
                    />
                  </div>
                </div>
                <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-semibold">{(recommendation.confidence * 100).toFixed(0)}%</span>
                </div>
                <Progress value={recommendation.confidence * 100} className="h-2" />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span className="font-semibold">{recommendation.estimatedTime}h</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Market Value</span>
                    <span className="font-semibold">${recommendation.marketValue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">{recommendation.reason}</p>
                  <div className="flex flex-wrap gap-1">
                    {recommendation.relatedSkills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {recommendation.relatedSkills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{recommendation.relatedSkills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Learning Paths Section */}
      {learningPaths.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Recommended Learning Paths</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <span>{path.title}</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration</span>
                        <p className="font-semibold">{path.estimatedDuration}h</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Difficulty</span>
                        <p className="font-semibold capitalize">{path.difficulty}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Target Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {path.targetSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Path
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 