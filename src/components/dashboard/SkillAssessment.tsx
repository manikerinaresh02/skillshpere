import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Clock,
  Target,
  Star,
  BookOpen,
  Code,
  Award,
  AlertCircle,
  PlayCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Define types locally to avoid import issues
interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'coding' | 'scenario';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

interface SkillAssessmentType {
  id: string;
  skillId: string;
  skillName: string;
  category: string;
  questions: AssessmentQuestion[];
  timeLimit: number;
  passingScore: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface AssessmentResult {
  id: string;
  skillId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  completedAt: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  recommendations: string[];
}

interface SkillRecommendation {
  skillId: string;
  skillName: string;
  category: string;
  confidence: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number;
  marketValue: number;
  relatedSkills: string[];
}

export const SkillAssessment = () => {
  const [assessments, setAssessments] = useState<SkillAssessmentType[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<SkillAssessmentType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [recommendations, setRecommendations] = useState<SkillRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use mock data directly instead of service call
        const mockAssessments: SkillAssessmentType[] = [
          {
            id: 'react-assessment',
            skillId: 'react',
            skillName: 'React Development',
            category: 'Frontend Development',
            questions: [
              {
                id: 'q1',
                question: 'What is the purpose of useState in React?',
                type: 'multiple-choice',
                options: [
                  'To manage component state',
                  'To create new components',
                  'To handle API calls',
                  'To style components'
                ],
                correctAnswer: 'To manage component state',
                explanation: 'useState is a React Hook that allows you to add state to functional components.',
                points: 10
              },
              {
                id: 'q2',
                question: 'What is the correct way to update state in React?',
                type: 'multiple-choice',
                options: [
                  'Directly modify the state variable',
                  'Use the setter function provided by useState',
                  'Use document.getElementById',
                  'Use innerHTML'
                ],
                correctAnswer: 'Use the setter function provided by useState',
                explanation: 'React state should always be updated using the setter function to ensure proper re-rendering.',
                points: 10
              }
            ],
            timeLimit: 30,
            passingScore: 70,
            difficulty: 'intermediate'
          },
          {
            id: 'javascript-assessment',
            skillId: 'javascript',
            skillName: 'JavaScript Fundamentals',
            category: 'Programming Languages',
            questions: [
              {
                id: 'q3',
                question: 'What is the difference between let and var?',
                type: 'multiple-choice',
                options: [
                  'There is no difference',
                  'let is block-scoped, var is function-scoped',
                  'var is block-scoped, let is function-scoped',
                  'let is hoisted, var is not'
                ],
                correctAnswer: 'let is block-scoped, var is function-scoped',
                explanation: 'let has block scope while var has function scope.',
                points: 10
              }
            ],
            timeLimit: 20,
            passingScore: 80,
            difficulty: 'beginner'
          }
        ];
        
        setAssessments(mockAssessments);
      } catch (error) {
        console.error('Error fetching assessments:', error);
        setError('Failed to load assessments. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAssessmentActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
        if (timeRemaining <= 1) {
          handleSubmitAssessment();
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isAssessmentActive, timeRemaining]);

  const startAssessment = (assessment: SkillAssessmentType) => {
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(assessment.timeLimit * 60);
    setIsAssessmentActive(true);
    setAssessmentResult(null);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentAssessment && currentQuestionIndex < currentAssessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!currentAssessment) return;

    try {
      setError(null);
      // Mock assessment result
      const mockResult: AssessmentResult = {
        id: `assessment_${Date.now()}`,
        skillId: currentAssessment.skillId,
        userId: 'current-user',
        score: 85,
        totalQuestions: currentAssessment.questions.length,
        correctAnswers: Math.floor(currentAssessment.questions.length * 0.85),
        timeTaken: 270,
        completedAt: new Date().toISOString(),
        proficiency: 'intermediate',
        recommendations: [
          'Great job! You are well-prepared for advanced React concepts.',
          'Consider exploring more complex state management patterns.',
          'Practice building real-world applications to solidify your skills.'
        ]
      };
      setAssessmentResult(mockResult);
      setIsAssessmentActive(false);
      
      // Fetch recommendations based on result
      try {
        // Mock recommendations
        const mockRecommendations: SkillRecommendation[] = [
          {
            skillId: 'react',
            skillName: 'React Development',
            category: 'Frontend Development',
            confidence: 0.95,
            reason: 'Your strong grasp of React hooks and state management is evident.',
            priority: 'high',
            estimatedTime: 10,
            marketValue: 120000,
            relatedSkills: ['redux', 'context-api', 'react-router']
          },
          {
            skillId: 'javascript',
            skillName: 'JavaScript Fundamentals',
            category: 'Programming Languages',
            confidence: 0.85,
            reason: 'Your understanding of variable scope and hoisting is solid.',
            priority: 'medium',
            estimatedTime: 5,
            marketValue: 90000,
            relatedSkills: ['es6', 'async-await', 'closures']
          }
        ];
        setRecommendations(mockRecommendations);
      } catch (recError) {
        console.error('Error fetching recommendations:', recError);
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setError('Failed to submit assessment. Please try again.');
      // Set a fallback result
      setAssessmentResult({
        id: `assessment_${Date.now()}`,
        skillId: currentAssessment.skillId,
        userId: 'current-user',
        score: 75,
        totalQuestions: currentAssessment.questions.length,
        correctAnswers: Math.floor(currentAssessment.questions.length * 0.75),
        timeTaken: 600,
        completedAt: new Date().toISOString(),
        proficiency: 'intermediate',
        recommendations: [
          'Focus on advanced concepts to reach expert level',
          'Practice real-world projects to improve practical skills',
          'Consider taking advanced courses in this area'
        ]
      });
      setIsAssessmentActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestion = () => {
    if (!currentAssessment) return null;
    return currentAssessment.questions[currentQuestionIndex];
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="glass-card border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertCircle className="w-5 h-5 mr-2" />
              Error Loading Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessmentResult) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Assessment Complete!</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Display */}
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {assessmentResult.score || 0}%
                </div>
                <div className="text-lg text-muted-foreground mb-4">
                  {assessmentResult.correctAnswers || 0} out of {assessmentResult.totalQuestions || 0} correct
                </div>
                <Badge 
                  variant={assessmentResult.score >= 90 ? "default" : assessmentResult.score >= 75 ? "secondary" : "outline"}
                  className="text-lg px-4 py-2"
                >
                  {(assessmentResult.proficiency || 'beginner').charAt(0).toUpperCase() + (assessmentResult.proficiency || 'beginner').slice(1)} Level
                </Badge>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-glass/20">
                  <div className="text-2xl font-bold text-foreground">{assessmentResult.score || 0}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-glass/20">
                  <div className="text-2xl font-bold text-foreground">
                    {Math.floor((assessmentResult.timeTaken || 0) / 60)}m {(assessmentResult.timeTaken || 0) % 60}s
                  </div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-glass/20">
                  <div className="text-2xl font-bold text-foreground">{assessmentResult.proficiency || 'beginner'}</div>
                  <div className="text-sm text-muted-foreground">Proficiency</div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {(assessmentResult.recommendations || []).map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => {
                  setAssessmentResult(null);
                  setCurrentAssessment(null);
                }}
                className="w-full"
              >
                Take Another Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skill Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Recommended Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.slice(0, 4).map((rec) => (
                    <div key={rec.skillId} className="p-4 rounded-lg border border-glass-border/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{rec.skillName}</h4>
                        <Badge variant={rec.priority === 'high' ? 'default' : 'secondary'}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{rec.estimatedTime}h to complete</span>
                        <span>${rec.marketValue.toLocaleString()}/year</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    );
  }

  if (isAssessmentActive && currentAssessment) {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;

    return (
      <div className="space-y-6">
        {/* Timer and Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="font-semibold">{formatTime(timeRemaining)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {currentAssessment.questions.length}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100} 
                  className="w-32"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>{currentAssessment.skillName} Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border border-glass-border/20 hover:bg-glass/20 transition-colors">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name={`question-${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={() => handleAnswerChange(currentQuestion.id, option)}
                          className="form-radio h-4 w-4 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'true-false' && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-glass-border/20 hover:bg-glass/20 transition-colors">
                      <input
                        type="radio"
                        id="true"
                        name={`question-${currentQuestion.id}`}
                        value="true"
                        checked={answers[currentQuestion.id] === "true"}
                        onChange={() => handleAnswerChange(currentQuestion.id, "true")}
                        className="form-radio h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="true" className="flex-1 cursor-pointer">True</label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg border border-glass-border/20 hover:bg-glass/20 transition-colors">
                      <input
                        type="radio"
                        id="false"
                        name={`question-${currentQuestion.id}`}
                        value="false"
                        checked={answers[currentQuestion.id] === "false"}
                        onChange={() => handleAnswerChange(currentQuestion.id, "false")}
                        className="form-radio h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="false" className="flex-1 cursor-pointer">False</label>
                    </div>
                  </div>
                )}

                {currentQuestion.type === 'coding' && (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Write your code here..."
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="w-full h-32 p-3 rounded-lg border border-glass-border/20 bg-glass/10 text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                )}

                {currentQuestion.type === 'scenario' && (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Describe your approach..."
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="w-full h-32 p-3 rounded-lg border border-glass-border/20 bg-glass/10 text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                <div className="flex items-center space-x-2">
                  {currentQuestionIndex === currentAssessment.questions.length - 1 ? (
                    <Button onClick={handleSubmitAssessment} className="bg-primary">
                      Submit Assessment
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion}>
                      Next Question
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Skill Assessments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assessments.map((assessment, index) => (
                <motion.div
                  key={assessment.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-4 rounded-lg border border-glass-border/20 hover:bg-glass/20 transition-colors cursor-pointer"
                  onClick={() => startAssessment(assessment)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{assessment.skillName}</h4>
                    <Badge variant="outline" className="text-xs">
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{assessment.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{assessment.questions.length} questions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>{assessment.passingScore}% to pass</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Assessment
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 