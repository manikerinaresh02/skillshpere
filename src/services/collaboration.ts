import { apiClient } from '../utils/api';
import {
  StudyGroup,
  GroupMember,
  LiveSession,
  SessionParticipant,
  PeerLearningRequest,
  ProgressData,
  StudyGroupFilters,
  CollaborationFilters
} from '../types/phase3';

export const collaborationService = {
  // Study Groups
  createStudyGroup: async (groupData: Partial<StudyGroup>): Promise<StudyGroup> => {
    try {
      const response = await apiClient.post('/collaboration/study-groups', groupData);
      return response.data;
    } catch (error) {
      console.error('Error creating study group:', error);
      // Return mock data for development
      return {
        id: 'group-1',
        name: groupData.name || 'React Study Group',
        description: groupData.description || 'A group for learning React development',
        category: groupData.category || 'Frontend Development',
        members: [
          {
            userId: 'user-1',
            name: 'John Doe',
            role: 'admin',
            joinedAt: new Date().toISOString(),
            contributionScore: 100,
            lastActive: new Date().toISOString()
          }
        ],
        maxMembers: groupData.maxMembers || 10,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: ['react', 'javascript', 'frontend']
      };
    }
  },

  joinStudyGroup: async (groupId: string, userId: string): Promise<void> => {
    try {
      await apiClient.post(`/collaboration/study-groups/${groupId}/join`, { userId });
    } catch (error) {
      console.error('Error joining study group:', error);
      // Mock successful join
    }
  },

  leaveStudyGroup: async (groupId: string, userId: string): Promise<void> => {
    try {
      await apiClient.post(`/collaboration/study-groups/${groupId}/leave`, { userId });
    } catch (error) {
      console.error('Error leaving study group:', error);
      // Mock successful leave
    }
  },

  getStudyGroups: async (filters?: StudyGroupFilters): Promise<StudyGroup[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
      if (filters?.search) params.append('search', filters.search);

      const response = await apiClient.get(`/collaboration/study-groups?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching study groups:', error);
      // Return mock data
      return [
        {
          id: 'group-1',
          name: 'React Study Group',
          description: 'A group for learning React development',
          category: 'Frontend Development',
          members: [
            {
              userId: 'user-1',
              name: 'John Doe',
              role: 'admin',
              joinedAt: new Date().toISOString(),
              contributionScore: 100,
              lastActive: new Date().toISOString()
            },
            {
              userId: 'user-2',
              name: 'Jane Smith',
              role: 'member',
              joinedAt: new Date().toISOString(),
              contributionScore: 75,
              lastActive: new Date().toISOString()
            }
          ],
          maxMembers: 10,
          createdAt: new Date().toISOString(),
          isActive: true,
          tags: ['react', 'javascript', 'frontend']
        },
        {
          id: 'group-2',
          name: 'Python Data Science',
          description: 'Learn Python for data science and machine learning',
          category: 'Data Science',
          members: [
            {
              userId: 'user-3',
              name: 'Mike Johnson',
              role: 'admin',
              joinedAt: new Date().toISOString(),
              contributionScore: 90,
              lastActive: new Date().toISOString()
            }
          ],
          maxMembers: 15,
          createdAt: new Date().toISOString(),
          isActive: true,
          tags: ['python', 'data-science', 'ml']
        }
      ];
    }
  },

  // Live Sessions
  createLiveSession: async (sessionData: Partial<LiveSession>): Promise<LiveSession> => {
    try {
      const response = await apiClient.post('/collaboration/live-sessions', sessionData);
      return response.data;
    } catch (error) {
      console.error('Error creating live session:', error);
      // Return mock data
      return {
        id: 'session-1',
        title: sessionData.title || 'React Hooks Workshop',
        hostId: 'user-1',
        hostName: 'John Doe',
        participants: [],
        startTime: sessionData.startTime || new Date(Date.now() + 3600000).toISOString(),
        duration: sessionData.duration || 60,
        topic: sessionData.topic || 'React Hooks',
        isActive: false,
        maxParticipants: sessionData.maxParticipants || 20,
        sessionType: sessionData.sessionType || 'workshop'
      };
    }
  },

  joinLiveSession: async (sessionId: string, userId: string): Promise<void> => {
    try {
      await apiClient.post(`/collaboration/live-sessions/${sessionId}/join`, { userId });
    } catch (error) {
      console.error('Error joining live session:', error);
      // Mock successful join
    }
  },

  endLiveSession: async (sessionId: string): Promise<void> => {
    try {
      await apiClient.post(`/collaboration/live-sessions/${sessionId}/end`);
    } catch (error) {
      console.error('Error ending live session:', error);
      // Mock successful end
    }
  },

  getLiveSessions: async (): Promise<LiveSession[]> => {
    try {
      const response = await apiClient.get('/collaboration/live-sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching live sessions:', error);
      // Return mock data
      return [
        {
          id: 'session-1',
          title: 'React Hooks Workshop',
          hostId: 'user-1',
          hostName: 'John Doe',
          participants: [
            {
              userId: 'user-2',
              name: 'Jane Smith',
              joinedAt: new Date().toISOString(),
              isActive: true
            }
          ],
          startTime: new Date(Date.now() + 3600000).toISOString(),
          duration: 60,
          topic: 'React Hooks',
          isActive: false,
          maxParticipants: 20,
          sessionType: 'workshop'
        },
        {
          id: 'session-2',
          title: 'Python Data Analysis',
          hostId: 'user-3',
          hostName: 'Mike Johnson',
          participants: [],
          startTime: new Date(Date.now() + 7200000).toISOString(),
          duration: 90,
          topic: 'Data Analysis with Python',
          isActive: false,
          maxParticipants: 15,
          sessionType: 'workshop'
        }
      ];
    }
  },

  // Peer Learning
  findStudyPartners: async (skillId: string, level: string): Promise<any[]> => {
    try {
      const response = await apiClient.get(`/collaboration/study-partners?skillId=${skillId}&level=${level}`);
      return response.data;
    } catch (error) {
      console.error('Error finding study partners:', error);
      // Return mock data
      return [
        {
          userId: 'user-2',
          name: 'Jane Smith',
          avatar: 'https://via.placeholder.com/40',
          skillLevel: 'intermediate',
          availability: 'weekends',
          matchScore: 85
        },
        {
          userId: 'user-3',
          name: 'Mike Johnson',
          avatar: 'https://via.placeholder.com/40',
          skillLevel: 'advanced',
          availability: 'evenings',
          matchScore: 92
        }
      ];
    }
  },

  sendLearningRequest: async (fromUserId: string, toUserId: string, skillId: string): Promise<void> => {
    try {
      await apiClient.post('/collaboration/learning-requests', {
        fromUserId,
        toUserId,
        skillId
      });
    } catch (error) {
      console.error('Error sending learning request:', error);
      // Mock successful request
    }
  },

  acceptLearningRequest: async (requestId: string): Promise<void> => {
    try {
      await apiClient.post(`/collaboration/learning-requests/${requestId}/accept`);
    } catch (error) {
      console.error('Error accepting learning request:', error);
      // Mock successful acceptance
    }
  },

  getLearningRequests: async (userId: string): Promise<PeerLearningRequest[]> => {
    try {
      const response = await apiClient.get(`/collaboration/learning-requests?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching learning requests:', error);
      // Return mock data
      return [
        {
          id: 'req-1',
          fromUserId: 'user-2',
          toUserId: userId,
          skillId: 'react',
          skillName: 'React Development',
          message: 'Would you like to study React together?',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ];
    }
  },

  // Progress Sharing
  shareProgress: async (userId: string, progressData: ProgressData): Promise<void> => {
    try {
      await apiClient.post('/collaboration/progress-sharing', {
        ...progressData,
        userId
      });
    } catch (error) {
      console.error('Error sharing progress:', error);
      // Mock successful share
    }
  },

  getSharedProgress: async (userId: string): Promise<ProgressData[]> => {
    try {
      const response = await apiClient.get(`/collaboration/progress-sharing?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shared progress:', error);
      // Return mock data
      return [
        {
          id: 'progress-1',
          userId: 'user-2',
          skillId: 'react',
          skillName: 'React Development',
          progress: 75,
          learningHours: 20,
          achievements: ['First Assessment', '10 Hours'],
          sharedAt: new Date().toISOString(),
          isPublic: true
        }
      ];
    }
  }
}; 