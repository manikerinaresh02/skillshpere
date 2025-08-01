import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StudyGroup } from '../../components/collaboration/StudyGroup';
import { collaborationService } from '../../services/collaboration';

jest.mock('../../services/collaboration', () => ({
  collaborationService: {
    getStudyGroups: jest.fn(),
    createStudyGroup: jest.fn(),
    joinStudyGroup: jest.fn(),
  },
}));

const mockedCollaborationService = collaborationService as jest.Mocked<typeof collaborationService>;

describe('StudyGroup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render study groups list', async () => {
    const mockGroups = [
      {
        id: 'group-1',
        name: 'React Study Group',
        description: 'A group for learning React development',
        category: 'Frontend Development',
        members: [
          {
            userId: 'user-1',
            name: 'John Doe',
            role: 'admin' as const,
            joinedAt: new Date().toISOString(),
            contributionScore: 100,
            lastActive: new Date().toISOString()
          }
        ],
        maxMembers: 10,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: ['react', 'javascript', 'frontend']
      }
    ];

    mockedCollaborationService.getStudyGroups.mockResolvedValue(mockGroups);

    render(<StudyGroup />);

    await waitFor(() => {
      expect(screen.getByText('React Study Group')).toBeInTheDocument();
    });

    expect(screen.getByText('A group for learning React development')).toBeInTheDocument();
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('Join Group')).toBeInTheDocument();
  });

  it('should show create group form when button is clicked', async () => {
    mockedCollaborationService.getStudyGroups.mockResolvedValue([]);

    render(<StudyGroup />);

    fireEvent.click(screen.getByText('Create Group'));

    await waitFor(() => {
      expect(screen.getByText('Create New Study Group')).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText('Enter group name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Describe your study group')).toBeInTheDocument();
  });

  it('should create a new study group', async () => {
    const mockCreatedGroup = {
      id: 'new-group',
      name: 'New Study Group',
      description: 'A new study group',
      category: 'Backend Development',
      members: [],
      maxMembers: 15,
      createdAt: new Date().toISOString(),
      isActive: true,
      tags: ['nodejs', 'backend']
    };

    mockedCollaborationService.getStudyGroups.mockResolvedValue([]);
    mockedCollaborationService.createStudyGroup.mockResolvedValue(mockCreatedGroup);

    render(<StudyGroup />);

    fireEvent.click(screen.getByText('Create Group'));

    await waitFor(() => {
      expect(screen.getByText('Create New Study Group')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Enter group name'), {
      target: { value: 'New Study Group' }
    });

    fireEvent.change(screen.getByPlaceholderText('Describe your study group'), {
      target: { value: 'A new study group' }
    });

    fireEvent.click(screen.getByText('Create Group'));

    await waitFor(() => {
      expect(mockedCollaborationService.createStudyGroup).toHaveBeenCalledWith({
        name: 'New Study Group',
        description: 'A new study group',
        category: '',
        maxMembers: 10,
        tags: []
      });
    });
  });

  it('should filter groups by search term', async () => {
    const mockGroups = [
      {
        id: 'group-1',
        name: 'React Study Group',
        description: 'A group for learning React development',
        category: 'Frontend Development',
        members: [],
        maxMembers: 10,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: ['react', 'javascript', 'frontend']
      },
      {
        id: 'group-2',
        name: 'Python Data Science',
        description: 'Learn Python for data science',
        category: 'Data Science',
        members: [],
        maxMembers: 15,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: ['python', 'data-science']
      }
    ];

    mockedCollaborationService.getStudyGroups.mockResolvedValue(mockGroups);

    render(<StudyGroup />);

    await waitFor(() => {
      expect(screen.getByText('React Study Group')).toBeInTheDocument();
      expect(screen.getByText('Python Data Science')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search groups...'), {
      target: { value: 'React' }
    });

    await waitFor(() => {
      expect(screen.getByText('React Study Group')).toBeInTheDocument();
      expect(screen.queryByText('Python Data Science')).not.toBeInTheDocument();
    });
  });

  it('should join a study group', async () => {
    const mockGroups = [
      {
        id: 'group-1',
        name: 'React Study Group',
        description: 'A group for learning React development',
        category: 'Frontend Development',
        members: [],
        maxMembers: 10,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: ['react', 'javascript', 'frontend']
      }
    ];

    mockedCollaborationService.getStudyGroups.mockResolvedValue(mockGroups);
    mockedCollaborationService.joinStudyGroup.mockResolvedValue();

    render(<StudyGroup />);

    await waitFor(() => {
      expect(screen.getByText('Join Group')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Join Group'));

    await waitFor(() => {
      expect(mockedCollaborationService.joinStudyGroup).toHaveBeenCalledWith('group-1', 'current-user');
    });
  });

  it('should show loading state', () => {
    mockedCollaborationService.getStudyGroups.mockImplementation(() => new Promise(() => {}));

    render(<StudyGroup />);

    expect(screen.getAllByRole('generic', { name: /loading/i })).toHaveLength(6);
  });

  it('should show empty state when no groups', async () => {
    mockedCollaborationService.getStudyGroups.mockResolvedValue([]);

    render(<StudyGroup />);

    await waitFor(() => {
      expect(screen.getByText('No study groups found')).toBeInTheDocument();
    });

    expect(screen.getByText('Create the first study group to get started')).toBeInTheDocument();
  });
}); 