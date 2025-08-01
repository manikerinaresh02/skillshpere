import axios, { InternalAxiosRequestConfig } from 'axios';

// Check if we're in development and no API URL is provided
const isDevelopment = import.meta.env.DEV;
const hasApiUrl = import.meta.env.VITE_API_URL;

// Use a mock base URL if no API server is configured
const baseURL = hasApiUrl 
  ? import.meta.env.VITE_API_URL 
  : isDevelopment 
    ? '/api' // This will result in 404s which we handle gracefully
    : 'https://api.skillsphere.com'; // Production fallback

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 404 errors gracefully when no backend server is available
    if (error.response?.status === 404 && import.meta.env.DEV) {
      console.warn('API endpoint not found - using mock data instead');
      // Return a mock response to prevent the error from propagating
      return Promise.resolve({
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config
      });
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };

export const api = {
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    register: (userData: any) =>
      apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    refresh: () => apiClient.post('/auth/refresh'),
    getProfile: () => apiClient.get('/auth/profile'),
    updateProfile: (data: any) =>
      apiClient.put('/auth/profile', data),
    getRecommendations: () => apiClient.get('/skills/recommendations'),
    // New skill assessment endpoints
    assessSkill: (skillId: string, answers: Record<string, string>) =>
      apiClient.post(`/skills/${skillId}/assess`, { answers }),
    getSkillInsights: (userId: string) =>
      apiClient.get(`/users/${userId}/skill-insights`),
    getAvailableAssessments: () =>
      apiClient.get('/skills/assessments'),
    trackProgress: (skillId: string, progress: any) =>
      apiClient.put(`/skills/${skillId}/progress`, progress),
  },
  // Market Data endpoints
  market: {
    getJobTrends: () =>
      apiClient.get('/market/job-trends'),
    getSalaryData: (skill?: string, location?: string) => {
      const params = new URLSearchParams();
      if (skill) params.append('skill', skill);
      if (location) params.append('location', location);
      return apiClient.get(`/market/salary-data?${params}`);
    },
    getSkillDemand: () =>
      apiClient.get('/market/skill-demand'),
    getMarketInsights: () =>
      apiClient.get('/market/insights'),
  },
  // Phase 3: Collaboration endpoints
  collaboration: {
    // Study Groups
    createStudyGroup: (groupData: any) =>
      apiClient.post('/collaboration/study-groups', groupData),
    getStudyGroups: (filters?: any) => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) params.append(key, String(value));
        });
      }
      return apiClient.get(`/collaboration/study-groups?${params}`);
    },
    joinStudyGroup: (groupId: string, userId: string) =>
      apiClient.post(`/collaboration/study-groups/${groupId}/join`, { userId }),
    leaveStudyGroup: (groupId: string, userId: string) =>
      apiClient.post(`/collaboration/study-groups/${groupId}/leave`, { userId }),
    
    // Live Sessions
    createLiveSession: (sessionData: any) =>
      apiClient.post('/collaboration/live-sessions', sessionData),
    getLiveSessions: () =>
      apiClient.get('/collaboration/live-sessions'),
    joinLiveSession: (sessionId: string, userId: string) =>
      apiClient.post(`/collaboration/live-sessions/${sessionId}/join`, { userId }),
    endLiveSession: (sessionId: string) =>
      apiClient.post(`/collaboration/live-sessions/${sessionId}/end`),
    
    // Peer Learning
    findStudyPartners: (skillId: string, level: string) =>
      apiClient.get(`/collaboration/study-partners?skillId=${skillId}&level=${level}`),
    sendLearningRequest: (requestData: any) =>
      apiClient.post('/collaboration/learning-requests', requestData),
    getLearningRequests: (userId: string) =>
      apiClient.get(`/collaboration/learning-requests?userId=${userId}`),
    acceptLearningRequest: (requestId: string) =>
      apiClient.post(`/collaboration/learning-requests/${requestId}/accept`),
    
    // Progress Sharing
    shareProgress: (progressData: any) =>
      apiClient.post('/collaboration/progress-sharing', progressData),
    getSharedProgress: (userId: string) =>
      apiClient.get(`/collaboration/progress-sharing?userId=${userId}`),
  },
  // Phase 3: AI endpoints
  ai: {
    // Learning Paths
    generateLearningPath: (data: any) =>
      apiClient.post('/ai/learning-paths', data),
    updateLearningPath: (pathId: string, data: any) =>
      apiClient.put(`/ai/learning-paths/${pathId}`, data),
    getRecommendedPaths: (userId: string) =>
      apiClient.get(`/ai/learning-paths/recommended?userId=${userId}`),
    
    // Adaptive Assessments
    createAdaptiveAssessment: (data: any) =>
      apiClient.post('/ai/adaptive-assessments', data),
    submitAdaptiveAnswer: (assessmentId: string, data: any) =>
      apiClient.post(`/ai/adaptive-assessments/${assessmentId}/answer`, data),
    getNextQuestion: (assessmentId: string) =>
      apiClient.get(`/ai/adaptive-assessments/${assessmentId}/next-question`),
    
    // Smart Recommendations
    getSmartRecommendations: (userId: string) =>
      apiClient.get(`/ai/recommendations?userId=${userId}`),
    updateRecommendationFeedback: (recommendationId: string, feedback: any) =>
      apiClient.post(`/ai/recommendations/${recommendationId}/feedback`, feedback),
    
    // Predictive Analytics
    predictLearningOutcome: (data: any) =>
      apiClient.post('/ai/predictions/learning-outcome', data),
    predictCareerPath: (data: any) =>
      apiClient.post('/ai/predictions/career-path', data),
  },
  // Phase 3: Analytics endpoints
  analytics: {
    // Learning Analytics
    getLearningAnalytics: (userId: string) =>
      apiClient.get(`/analytics/learning?userId=${userId}`),
    trackLearningActivity: (activityData: any) =>
      apiClient.post('/analytics/learning-activity', activityData),
    getPerformanceTrends: (userId: string, timeFrame: string) =>
      apiClient.get(`/analytics/performance-trends?userId=${userId}&timeFrame=${timeFrame}`),
    
    // Skill Correlation
    analyzeSkillCorrelations: (userId: string) =>
      apiClient.get(`/analytics/skill-correlations?userId=${userId}`),
    getLearningImplications: (skillId: string) =>
      apiClient.get(`/analytics/learning-implications?skillId=${skillId}`),
    
    // Career Paths
    getCareerPaths: (userId: string) =>
      apiClient.get(`/analytics/career-paths?userId=${userId}`),
    analyzeCareerFit: (data: any) =>
      apiClient.post('/analytics/career-fit', data),
    
    // Performance Predictions
    predictPerformance: (data: any) =>
      apiClient.post('/analytics/performance-prediction', data),
    getSuccessProbability: (data: any) =>
      apiClient.post('/analytics/success-probability', data),
  },
  // Phase 3: Gamification endpoints
  gamification: {
    // Achievements
    getAchievements: (userId: string) =>
      apiClient.get(`/gamification/achievements?userId=${userId}`),
    unlockAchievement: (achievementId: string, userId: string) =>
      apiClient.post(`/gamification/achievements/${achievementId}/unlock`, { userId }),
    getAchievementProgress: (userId: string) =>
      apiClient.get(`/gamification/achievements/progress?userId=${userId}`),
    
    // Leaderboards
    getLeaderboards: (type: string) =>
      apiClient.get(`/gamification/leaderboards?type=${type}`),
    getUserRanking: (userId: string, leaderboardId: string) =>
      apiClient.get(`/gamification/leaderboards/${leaderboardId}/ranking?userId=${userId}`),
    updateUserScore: (leaderboardId: string, data: any) =>
      apiClient.put(`/gamification/leaderboards/${leaderboardId}/score`, data),
    
    // Badges
    getBadges: (userId: string) =>
      apiClient.get(`/gamification/badges?userId=${userId}`),
    earnBadge: (badgeId: string, userId: string) =>
      apiClient.post(`/gamification/badges/${badgeId}/earn`, { userId }),
    getBadgeProgress: (userId: string) =>
      apiClient.get(`/gamification/badges/progress?userId=${userId}`),
    
    // User Stats
    getUserStats: (userId: string) =>
      apiClient.get(`/gamification/user-stats?userId=${userId}`),
    getLevelInfo: (userId: string) =>
      apiClient.get(`/gamification/level-info?userId=${userId}`),
  },
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Loading state utility
export const createLoadingState = () => {
  let loading = false;
  let error: string | null = null;

  const setLoading = (isLoading: boolean) => {
    loading = isLoading;
  };

  const setError = (errorMessage: string | null) => {
    error = errorMessage;
  };

  return {
    loading,
    error,
    setLoading,
    setError,
  };
}; 