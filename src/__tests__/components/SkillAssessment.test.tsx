import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SkillAssessment } from '../../components/dashboard/SkillAssessment';
import { skillService } from '../../services/skills';

jest.mock('../../services/skills', () => ({
  skillService: {
    getAvailableAssessments: jest.fn(),
    assessSkill: jest.fn(),
    getRecommendations: jest.fn(),
  },
}));

const mockedSkillService = skillService as jest.Mocked<typeof skillService>;

describe('SkillAssessment Component', () => {
  const mockAssessment = {
    id: '1',
    skillId: 'react',
    skillName: 'React Development',
    category: 'Frontend Development',
    difficulty: 'intermediate' as const,
    timeLimit: 1,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of useState in React?',
        type: 'multiple-choice' as const,
        options: [
          'To manage component state',
          'To create new components',
          'To handle API calls',
          'To style components'
        ],
        correctAnswer: 'To manage component state',
        explanation: 'useState is a React Hook that allows you to add state to functional components.',
        points: 10
      }
    ]
  };

  const mockResult = {
    id: 'assessment_123',
    skillId: 'react',
    userId: 'user_123',
    score: 85,
    correctAnswers: 1,
    totalQuestions: 1,
    timeTaken: 600,
    completedAt: '2024-01-15T10:00:00Z',
    proficiency: 'advanced' as const,
    recommendations: [
      'Focus on advanced concepts to reach expert level',
      'Practice real-world projects to improve practical skills'
    ]
  };

  const mockRecommendations = [
    {
      skillId: 'react-advanced',
      skillName: 'React Advanced Patterns',
      category: 'Frontend Development',
      reason: 'Based on your React intermediate level and market demand',
      priority: 'high' as const,
      marketValue: 125000,
      estimatedTime: 40,
      confidence: 85,
      relatedSkills: ['TypeScript', 'State Management', 'Performance Optimization']
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render available assessments', async () => {
    mockedSkillService.getAvailableAssessments.mockResolvedValue([mockAssessment]);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Skill Assessments')).toBeInTheDocument();
    });

    expect(screen.getByText('React Development')).toBeInTheDocument();
    expect(screen.getByText('intermediate')).toBeInTheDocument();
    expect(screen.getByText('1 minutes')).toBeInTheDocument();
    expect(screen.getByText('1 questions')).toBeInTheDocument();
    expect(screen.getByText('70% to pass')).toBeInTheDocument();
  });

  it('should start assessment when clicked', async () => {
    mockedSkillService.getAvailableAssessments.mockResolvedValue([mockAssessment]);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Assessment'));

    await waitFor(() => {
      expect(screen.getByText('React Development Assessment')).toBeInTheDocument();
      expect(screen.getByText('What is the purpose of useState in React?')).toBeInTheDocument();
    });
  });

  it('should handle question navigation', async () => {
    const multiQuestionAssessment = {
      ...mockAssessment,
      questions: [
        mockAssessment.questions[0],
        {
          id: 'q2',
          question: 'What is JSX?',
          type: 'multiple-choice' as const,
          options: ['JavaScript XML', 'A styling framework', 'A testing library', 'A build tool'],
          correctAnswer: 'JavaScript XML',
          explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript.',
          points: 10
        }
      ]
    };

    mockedSkillService.getAvailableAssessments.mockResolvedValue([multiQuestionAssessment]);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Assessment'));

    await waitFor(() => {
      expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
    });

    // Answer first question
    fireEvent.click(screen.getByLabelText('To manage component state'));

    // Go to next question
    fireEvent.click(screen.getByText('Next Question'));

    await waitFor(() => {
      expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
      expect(screen.getByText('What is JSX?')).toBeInTheDocument();
    });

    // Go back to previous question
    fireEvent.click(screen.getByText('Previous'));

    await waitFor(() => {
      expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
      expect(screen.getByText('What is the purpose of useState in React?')).toBeInTheDocument();
    });
  });

  it('should submit assessment and show results', async () => {
    mockedSkillService.getAvailableAssessments.mockResolvedValue([mockAssessment]);
    mockedSkillService.assessSkill.mockResolvedValue(mockResult);
    mockedSkillService.getRecommendations.mockResolvedValue(mockRecommendations);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Assessment'));

    await waitFor(() => {
      expect(screen.getByText('What is the purpose of useState in React?')).toBeInTheDocument();
    });

    // Answer the question
    fireEvent.click(screen.getByLabelText('To manage component state'));

    // Submit assessment
    fireEvent.click(screen.getByText('Submit Assessment'));

    await waitFor(() => {
      expect(screen.getByText('Assessment Complete!')).toBeInTheDocument();
    });

    // Check result display
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('1 out of 1 correct')).toBeInTheDocument();
    expect(screen.getByText('Advanced Level')).toBeInTheDocument();
    expect(screen.getByText('Focus on advanced concepts to reach expert level')).toBeInTheDocument();
  });

  it('should show skill recommendations after assessment', async () => {
    mockedSkillService.getAvailableAssessments.mockResolvedValue([mockAssessment]);
    mockedSkillService.assessSkill.mockResolvedValue(mockResult);
    mockedSkillService.getRecommendations.mockResolvedValue(mockRecommendations);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Assessment'));

    await waitFor(() => {
      expect(screen.getByText('What is the purpose of useState in React?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('To manage component state'));
    fireEvent.click(screen.getByText('Submit Assessment'));

    await waitFor(() => {
      expect(screen.getByText('Recommended Skills')).toBeInTheDocument();
    });

    expect(screen.getByText('React Advanced Patterns')).toBeInTheDocument();
    expect(screen.getByText('high priority')).toBeInTheDocument();
    expect(screen.getByText('Based on your React intermediate level and market demand')).toBeInTheDocument();
    expect(screen.getByText('$125,000')).toBeInTheDocument();
    expect(screen.getByText('40h')).toBeInTheDocument();
    // Use getAllByText to handle multiple instances of 85%
    expect(screen.getAllByText('85%')).toHaveLength(3);
  });

  it('should handle timer functionality', async () => {
    jest.useFakeTimers();
    
    mockedSkillService.getAvailableAssessments.mockResolvedValue([mockAssessment]);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Assessment'));

    await waitFor(() => {
      expect(screen.getByText('1:00')).toBeInTheDocument();
    });

    // Advance timer by 30 seconds
    jest.advanceTimersByTime(30000);
    
    await waitFor(() => {
      expect(screen.getByText('0:30')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('should handle different question types', async () => {
    const assessmentWithDifferentTypes = {
      ...mockAssessment,
      questions: [
        {
          id: 'q1',
          question: 'Is React a library or framework?',
          type: 'true-false' as const,
          correctAnswer: 'true',
          explanation: 'React is a JavaScript library for building user interfaces.',
          points: 10
        },
        {
          id: 'q2',
          question: 'Write a simple React component.',
          type: 'coding' as const,
          correctAnswer: 'function MyComponent() { return <div>Hello</div>; }',
          explanation: 'This is a basic React functional component.',
          points: 15
        },
        {
          id: 'q3',
          question: 'How would you handle state management in a large React app?',
          type: 'scenario' as const,
          correctAnswer: 'Use Redux or Context API for global state',
          explanation: 'For large applications, centralized state management is essential.',
          points: 20
        }
      ]
    };

    mockedSkillService.getAvailableAssessments.mockResolvedValue([assessmentWithDifferentTypes]);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Assessment'));

    await waitFor(() => {
      expect(screen.getByText('Is React a library or framework?')).toBeInTheDocument();
    });

    // Answer true-false question
    fireEvent.click(screen.getByLabelText('True'));

    // Go to next question (coding)
    fireEvent.click(screen.getByText('Next Question'));

    await waitFor(() => {
      expect(screen.getByText('Write a simple React component.')).toBeInTheDocument();
    });

    // Go to next question (scenario)
    fireEvent.click(screen.getByText('Next Question'));

    await waitFor(() => {
      expect(screen.getByText('How would you handle state management in a large React app?')).toBeInTheDocument();
    });
  });

  it('should handle assessment restart', async () => {
    mockedSkillService.getAvailableAssessments.mockResolvedValue([mockAssessment]);
    mockedSkillService.assessSkill.mockResolvedValue(mockResult);
    mockedSkillService.getRecommendations.mockResolvedValue(mockRecommendations);

    render(<SkillAssessment />);

    await waitFor(() => {
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Start Assessment'));

    await waitFor(() => {
      expect(screen.getByText('What is the purpose of useState in React?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('To manage component state'));
    fireEvent.click(screen.getByText('Submit Assessment'));

    await waitFor(() => {
      expect(screen.getByText('Assessment Complete!')).toBeInTheDocument();
    });

    // Click take another assessment
    fireEvent.click(screen.getByText('Take Another Assessment'));

    await waitFor(() => {
      expect(screen.getByText('Skill Assessments')).toBeInTheDocument();
      expect(screen.getByText('Start Assessment')).toBeInTheDocument();
    });
  });
}); 