import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Video,
  Users,
  Clock,
  Calendar,
  MessageSquare,
  Play,
  Pause,
  Square,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share,
  Settings,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';

// Define types locally to avoid import issues
interface SessionParticipant {
  userId: string;
  name: string;
  avatar?: string;
  role: 'host' | 'co-host' | 'participant';
  joinedAt: string;
  isActive: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}

interface LiveSessionType {
  id: string;
  title: string;
  topic: string;
  hostId: string;
  hostName: string;
  sessionType: 'workshop' | 'presentation' | 'discussion' | 'q&a';
  startTime: string;
  endTime?: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  participants: SessionParticipant[];
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  recordingUrl?: string;
  chatEnabled: boolean;
  screenShareEnabled: boolean;
  isPrivate: boolean;
  tags: string[];
}

export const LiveSession = () => {
  const [sessions, setSessions] = useState<LiveSessionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentSession, setCurrentSession] = useState<LiveSessionType | null>(null);
  const [isInSession, setIsInSession] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    topic: '',
    duration: 60,
    maxParticipants: 20,
    sessionType: 'workshop' as const,
    startTime: new Date(Date.now() + 3600000).toISOString().slice(0, 16)
  });

  useEffect(() => {
    const fetchLiveSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use mock data directly instead of service call
        const mockSessions: LiveSessionType[] = [
          {
            id: 'session-1',
            title: 'React Hooks Deep Dive',
            topic: 'Advanced React Hooks and Custom Hooks',
            hostId: 'user-1',
            hostName: 'John Doe',
            sessionType: 'workshop',
            startTime: new Date(Date.now() + 1800000).toISOString(),
            duration: 90,
            maxParticipants: 25,
            currentParticipants: 12,
            participants: [
              {
                userId: 'user-1',
                name: 'John Doe',
                role: 'host',
                joinedAt: new Date().toISOString(),
                isActive: true,
                isMuted: false,
                isVideoOn: true
              },
              {
                userId: 'user-2',
                name: 'Jane Smith',
                role: 'participant',
                joinedAt: new Date().toISOString(),
                isActive: true,
                isMuted: true,
                isVideoOn: false
              }
            ],
            status: 'scheduled',
            chatEnabled: true,
            screenShareEnabled: true,
            isPrivate: false,
            tags: ['react', 'hooks', 'frontend']
          },
          {
            id: 'session-2',
            title: 'JavaScript Best Practices',
            topic: 'Modern JavaScript patterns and best practices',
            hostId: 'user-3',
            hostName: 'Mike Johnson',
            sessionType: 'presentation',
            startTime: new Date(Date.now() + 7200000).toISOString(),
            duration: 60,
            maxParticipants: 30,
            currentParticipants: 8,
            participants: [
              {
                userId: 'user-3',
                name: 'Mike Johnson',
                role: 'host',
                joinedAt: new Date().toISOString(),
                isActive: true,
                isMuted: false,
                isVideoOn: true
              }
            ],
            status: 'scheduled',
            chatEnabled: true,
            screenShareEnabled: true,
            isPrivate: false,
            tags: ['javascript', 'best-practices', 'es6']
          },
          {
            id: 'session-3',
            title: 'Live Coding: Building a Todo App',
            topic: 'Real-time coding session building a React todo application',
            hostId: 'user-4',
            hostName: 'Sarah Wilson',
            sessionType: 'workshop',
            startTime: new Date().toISOString(),
            duration: 120,
            maxParticipants: 15,
            currentParticipants: 15,
            participants: [
              {
                userId: 'user-4',
                name: 'Sarah Wilson',
                role: 'host',
                joinedAt: new Date().toISOString(),
                isActive: true,
                isMuted: false,
                isVideoOn: true
              },
              {
                userId: 'user-5',
                name: 'David Brown',
                role: 'participant',
                joinedAt: new Date().toISOString(),
                isActive: true,
                isMuted: true,
                isVideoOn: false
              }
            ],
            status: 'live',
            chatEnabled: true,
            screenShareEnabled: true,
            isPrivate: false,
            tags: ['react', 'coding', 'todo-app']
          }
        ];
        
        setSessions(mockSessions);
      } catch (error) {
        console.error('Error fetching live sessions:', error);
        setError('Failed to load live sessions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveSessions();
  }, []);

  const handleCreateSession = async () => {
    try {
      // This function will now use a mock service call
      console.log('Creating session:', newSession);
      const createdSession: LiveSessionType = {
        id: `mock-session-${Date.now()}`,
        title: newSession.title,
        topic: newSession.topic,
        hostId: 'mock-host-id', // Replace with actual user ID
        hostName: 'Mock Host', // Replace with actual user name
        sessionType: newSession.sessionType,
        startTime: newSession.startTime,
        duration: newSession.duration,
        maxParticipants: newSession.maxParticipants,
        currentParticipants: 0,
        participants: [],
        status: 'scheduled',
        chatEnabled: true,
        screenShareEnabled: true,
        isPrivate: false,
        tags: []
      };
      setSessions(prev => [createdSession, ...prev]);
      setShowCreateForm(false);
      setNewSession({
        title: '',
        topic: '',
        duration: 60,
        maxParticipants: 20,
        sessionType: 'workshop',
        startTime: new Date(Date.now() + 3600000).toISOString().slice(0, 16)
      });
    } catch (error) {
      console.error('Error creating live session:', error);
    }
  };

  const handleJoinSession = async (sessionId: string) => {
    try {
      // This function will now use a mock service call
      console.log('Joining session:', sessionId);
      const session = sessions.find(s => s.id === sessionId);
      if (session) {
        setCurrentSession(session);
        setIsInSession(true);
      }
    } catch (error) {
      console.error('Error joining live session:', error);
    }
  };

  const handleEndSession = async (sessionId: string) => {
    try {
      // This function will now use a mock service call
      console.log('Ending session:', sessionId);
      setCurrentSession(null);
      setIsInSession(false);
      // In a real app, you'd update the session status to 'ended' in the mock data
      // For now, we'll just remove it from the list
      setSessions(prev => prev.filter(s => s.id !== sessionId));
    } catch (error) {
      console.error('Error ending live session:', error);
    }
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'coding':
        return <Video className="w-4 h-4" />;
      case 'discussion':
        return <MessageSquare className="w-4 h-4" />;
      case 'review':
        return <Share className="w-4 h-4" />;
      case 'workshop':
        return <Users className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'coding':
        return 'bg-blue-100 text-blue-800';
      case 'discussion':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'workshop':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  if (isInSession && currentSession) {
    return (
      <div className="space-y-6">
        {/* Session Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
              <Video className="w-6 h-6 text-primary" />
              <span>{currentSession.title}</span>
            </h2>
            <p className="text-muted-foreground">Live Session in Progress</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </Badge>
            <Button variant="outline" onClick={() => handleEndSession(currentSession.id)}>
              <Square className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>
        </div>

        {/* Session Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Video stream will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participants and Controls */}
          <div className="space-y-6">
            {/* Participants */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Participants ({currentSession.participants.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentSession.participants.map((participant) => (
                    <div key={participant.userId} className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {new Date(participant.joinedAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {participant.isActive && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Controls */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Session Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    <Mic className="w-4 h-4 mr-2" />
                    Mute
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Screen
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Session Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Topic:</span>
                    <span>{currentSession.topic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{currentSession.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="outline" className={getSessionTypeColor(currentSession.sessionType)}>
                      {currentSession.sessionType}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
            <Video className="w-6 h-6 text-primary" />
            <span>Live Sessions</span>
          </h2>
          <p className="text-muted-foreground">Join or create real-time learning sessions</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center space-x-2">
          <Video className="w-4 h-4" />
          <span>Create Session</span>
        </Button>
      </div>

      {/* Create Session Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Create New Live Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Session Title</label>
                <Input
                  value={newSession.title}
                  onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter session title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Topic</label>
                <Textarea
                  value={newSession.topic}
                  onChange={(e) => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="Describe the session topic"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input
                    type="number"
                    value={newSession.duration}
                    onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    min="15"
                    max="180"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Participants</label>
                  <Input
                    type="number"
                    value={newSession.maxParticipants}
                    onChange={(e) => setNewSession(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                    min="2"
                    max="50"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Session Type</label>
                <Select
                  value={newSession.sessionType}
                  onValueChange={(value: any) => setNewSession(prev => ({ ...prev, sessionType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="coding">Coding Session</SelectItem>
                    <SelectItem value="discussion">Discussion</SelectItem>
                    <SelectItem value="review">Code Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <Input
                  type="datetime-local"
                  value={newSession.startTime}
                  onChange={(e) => setNewSession(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateSession} className="flex-1">
                  Create Session
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{session.topic}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getSessionTypeIcon(session.sessionType)}
                    <Badge variant="outline" className={getSessionTypeColor(session.sessionType)}>
                      {session.sessionType}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Session Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Host:</span>
                    <span>{session.hostName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{session.duration} minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Participants:</span>
                    <span>{session.participants.length}/{session.maxParticipants}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Start Time:</span>
                    <span>{new Date(session.startTime).toLocaleString()}</span>
                  </div>
                </div>

                {/* Participants */}
                <div>
                  <p className="text-sm font-medium mb-2">Participants:</p>
                  <div className="flex -space-x-2">
                    {session.participants.slice(0, 5).map((participant) => (
                      <Avatar key={participant.userId} className="w-8 h-8 border-2 border-background">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {session.participants.length > 5 && (
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs">
                        +{session.participants.length - 5}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleJoinSession(session.id)}
                    className="flex-1"
                    disabled={session.isActive}
                  >
                    {session.isActive ? 'In Progress' : 'Join Session'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {sessions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No live sessions available</h3>
          <p className="text-muted-foreground">
            Create the first live session to start collaborative learning
          </p>
        </div>
      )}
    </div>
  );
}; 