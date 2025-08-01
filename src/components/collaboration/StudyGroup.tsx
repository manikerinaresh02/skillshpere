import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, MessageSquare, BookOpen, Plus, Search, Filter, MoreHorizontal, AlertCircle, Send, X, CheckCircle, Paperclip, File, Image, Video, Crown, Star, Clock, MapPin } from 'lucide-react';

// Define types locally to avoid import issues
interface GroupMember {
  userId: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  contributionScore: number;
  lastActive: string;
  bio?: string;
  skills?: string[];
  location?: string;
  isCreator?: boolean;
}
interface StudyGroupType {
  id: string;
  name: string;
  description: string;
  category: string;
  members: GroupMember[];
  maxMembers: number;
  createdAt: string;
  isActive: boolean;
  tags: string[];
  creatorId: string;
  meetingSchedule?: string;
  nextMeeting?: string;
  totalMessages: number;
  totalFiles: number;
}
interface GroupMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system' | 'file';
  fileAttachment?: {
    name: string;
    type: string;
    size: number;
    url?: string;
  };
}
export const StudyGroup = () => {
  const [groups, setGroups] = useState<StudyGroupType[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<StudyGroupType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroupType | null>(null);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [groupMessages, setGroupMessages] = useState<Record<string, GroupMessage[]>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: '',
    maxMembers: 10,
    tags: [] as string[]
  });
  const [joinGroupError, setJoinGroupError] = useState<{
    message: string;
    groupName: string;
    groupId: string;
  } | null>(null);
  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Use mock data directly instead of service call
        const mockGroups: StudyGroupType[] = [{
          id: 'group-1',
          name: 'React Study Group',
          description: 'A comprehensive group for learning React development, hooks, state management, and best practices. We focus on real-world projects and collaborative learning.',
          category: 'Frontend Development',
          creatorId: 'user-1',
          members: [{
            userId: 'user-1',
            name: 'John Doe',
            role: 'admin',
            joinedAt: new Date().toISOString(),
            contributionScore: 100,
            lastActive: new Date().toISOString(),
            bio: 'Senior React Developer with 5+ years experience. Passionate about teaching and mentoring.',
            skills: ['React', 'TypeScript', 'Node.js', 'Redux'],
            location: 'San Francisco, CA',
            isCreator: true
          }, {
            userId: 'user-2',
            name: 'Jane Smith',
            role: 'moderator',
            joinedAt: new Date(Date.now() - 86400000).toISOString(),
            contributionScore: 85,
            lastActive: new Date().toISOString(),
            bio: 'Frontend developer transitioning from Angular to React. Learning fast!',
            skills: ['React', 'JavaScript', 'CSS', 'Angular'],
            location: 'New York, NY'
          }, {
            userId: 'user-3',
            name: 'Mike Johnson',
            role: 'member',
            joinedAt: new Date(Date.now() - 172800000).toISOString(),
            contributionScore: 60,
            lastActive: new Date(Date.now() - 3600000).toISOString(),
            bio: 'Junior developer eager to learn React. Working on my first project.',
            skills: ['JavaScript', 'HTML', 'CSS'],
            location: 'Austin, TX'
          }, {
            userId: 'user-7',
            name: 'Sarah Wilson',
            role: 'member',
            joinedAt: new Date(Date.now() - 259200000).toISOString(),
            contributionScore: 75,
            lastActive: new Date(Date.now() - 7200000).toISOString(),
            bio: 'UI/UX designer learning React to build better interfaces.',
            skills: ['React', 'Figma', 'CSS', 'Design Systems'],
            location: 'Seattle, WA'
          }],
          maxMembers: 10,
          createdAt: new Date().toISOString(),
          isActive: true,
          tags: ['react', 'javascript', 'frontend', 'hooks'],
          meetingSchedule: 'Every Tuesday at 7 PM EST',
          nextMeeting: new Date(Date.now() + 86400000).toISOString(),
          totalMessages: 156,
          totalFiles: 23
        }, {
          id: 'group-2',
          name: 'Python Data Science',
          description: 'Advanced Python group focusing on data science, machine learning, and statistical analysis. We work on real datasets and build ML models together.',
          category: 'Data Science',
          creatorId: 'user-4',
          members: [{
            userId: 'user-4',
            name: 'Sarah Lee',
            role: 'admin',
            joinedAt: new Date().toISOString(),
            contributionScore: 95,
            lastActive: new Date().toISOString(),
            bio: 'Data Scientist with PhD in Computer Science. Expert in ML and statistical analysis.',
            skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
            location: 'Boston, MA',
            isCreator: true
          }, {
            userId: 'user-5',
            name: 'David Wilson',
            role: 'moderator',
            joinedAt: new Date(Date.now() - 86400000).toISOString(),
            contributionScore: 85,
            lastActive: new Date().toISOString(),
            bio: 'ML Engineer with focus on computer vision. Building autonomous systems.',
            skills: ['Python', 'OpenCV', 'PyTorch', 'Docker'],
            location: 'Seattle, WA'
          }, {
            userId: 'user-8',
            name: 'Emily Chen',
            role: 'member',
            joinedAt: new Date(Date.now() - 172800000).toISOString(),
            contributionScore: 70,
            lastActive: new Date(Date.now() - 1800000).toISOString(),
            bio: 'Graduate student in Data Science. Learning ML algorithms and data preprocessing.',
            skills: ['Python', 'Pandas', 'Matplotlib', 'SQL'],
            location: 'Chicago, IL'
          }],
          maxMembers: 15,
          createdAt: new Date().toISOString(),
          isActive: true,
          tags: ['python', 'data-science', 'ml', 'pandas'],
          meetingSchedule: 'Every Thursday at 6 PM EST',
          nextMeeting: new Date(Date.now() + 259200000).toISOString(),
          totalMessages: 89,
          totalFiles: 45
        }, {
          id: 'group-3',
          name: 'Cloud Computing Basics',
          description: 'Learn cloud computing fundamentals with AWS, Azure, and Google Cloud. Hands-on labs and real-world deployment scenarios.',
          category: 'Cloud Computing',
          creatorId: 'user-6',
          members: [{
            userId: 'user-6',
            name: 'Alex Chen',
            role: 'admin',
            joinedAt: new Date().toISOString(),
            contributionScore: 90,
            lastActive: new Date().toISOString(),
            bio: 'DevOps Engineer with 8+ years experience. AWS Solutions Architect certified.',
            skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
            location: 'Austin, TX',
            isCreator: true
          }, {
            userId: 'user-9',
            name: 'Maria Rodriguez',
            role: 'member',
            joinedAt: new Date(Date.now() - 86400000).toISOString(),
            contributionScore: 65,
            lastActive: new Date(Date.now() - 3600000).toISOString(),
            bio: 'Software developer learning cloud deployment. Building scalable applications.',
            skills: ['JavaScript', 'Node.js', 'Docker', 'AWS'],
            location: 'Miami, FL'
          }],
          maxMembers: 8,
          createdAt: new Date().toISOString(),
          isActive: true,
          tags: ['cloud', 'aws', 'azure', 'devops'],
          meetingSchedule: 'Every Saturday at 10 AM EST',
          nextMeeting: new Date(Date.now() + 432000000).toISOString(),
          totalMessages: 67,
          totalFiles: 18
        }];
        setGroups(mockGroups);

        // Initialize messages for each group
        const initialMessages: Record<string, GroupMessage[]> = {};
        mockGroups.forEach(group => {
          initialMessages[group.id] = [{
            id: 'msg-1',
            userId: group.members[0].userId,
            userName: group.members[0].name,
            message: `Welcome to ${group.name}! Let's start learning together.`,
            timestamp: new Date().toISOString(),
            type: 'system'
          }, {
            id: 'msg-2',
            userId: group.members[0].userId,
            userName: group.members[0].name,
            message: 'Feel free to ask questions and share resources. I\'m here to help!',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            type: 'text'
          }, {
            id: 'msg-3',
            userId: group.members[1]?.userId || group.members[0].userId,
            userName: group.members[1]?.name || group.members[0].name,
            message: 'Thanks for creating this group! Looking forward to learning with everyone.',
            timestamp: new Date(Date.now() - 600000).toISOString(),
            type: 'text'
          }];
        });
        setGroupMessages(initialMessages);
      } catch (error) {
        console.error('Error fetching study groups:', error);
        setError('Failed to load study groups. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudyGroups();
  }, []);
  useEffect(() => {
    filterGroups();
  }, [groups, searchTerm, selectedCategory]);
  const filterGroups = () => {
    let filtered = groups;
    if (searchTerm) {
      filtered = filtered.filter(group => group.name.toLowerCase().includes(searchTerm.toLowerCase()) || group.description.toLowerCase().includes(searchTerm.toLowerCase()) || group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(group => group.category === selectedCategory);
    }
    setFilteredGroups(filtered);
  };
  const handleCreateGroup = async () => {
    try {
      setError(null);

      // Validate form
      if (!newGroup.name.trim() || !newGroup.description.trim() || !newGroup.category.trim()) {
        setError('Please fill in all required fields.');
        return;
      }

      // Create new group
      const createdGroup: StudyGroupType = {
        id: `group-${Date.now()}`,
        name: newGroup.name,
        description: newGroup.description,
        category: newGroup.category,
        creatorId: 'current-user',
        members: [{
          userId: 'current-user',
          name: 'You',
          role: 'admin',
          joinedAt: new Date().toISOString(),
          contributionScore: 0,
          lastActive: new Date().toISOString(),
          bio: 'Group creator and admin',
          skills: ['React', 'JavaScript', 'Node.js'],
          location: 'Your Location',
          isCreator: true
        }],
        maxMembers: newGroup.maxMembers,
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: newGroup.tags,
        totalMessages: 1,
        totalFiles: 0
      };

      // Add to groups list
      setGroups(prev => [createdGroup, ...prev]);

      // Initialize messages for new group
      setGroupMessages(prev => ({
        ...prev,
        [createdGroup.id]: [{
          id: 'msg-1',
          userId: 'current-user',
          userName: 'You',
          message: `Welcome to ${createdGroup.name}! You are the admin of this group.`,
          timestamp: new Date().toISOString(),
          type: 'system'
        }]
      }));

      // Reset form and close
      setNewGroup({
        name: '',
        description: '',
        category: '',
        maxMembers: 10,
        tags: []
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating study group:', error);
      setError('Failed to create study group. Please try again.');
    }
  };
  const handleJoinGroup = async (groupId: string) => {
    try {
      setError(null);
      setJoinGroupError(null);

      // Check if user is already a member
      const group = groups.find(g => g.id === groupId);
      if (!group) {
        setError('Group not found.');
        return;
      }
      const isAlreadyMember = group.members.some(member => member.userId === 'current-user');
      if (isAlreadyMember) {
        setError('You are already a member of this group.');
        return;
      }

      // Check if group is full
      if (group.members.length >= group.maxMembers) {
        setError('This group is full.');
        return;
      }

      // Add user to group
      const updatedGroups = groups.map(g => g.id === groupId ? {
        ...g,
        members: [...g.members, {
          userId: 'current-user',
          name: 'You',
          role: 'member' as const,
          joinedAt: new Date().toISOString(),
          contributionScore: 0,
          lastActive: new Date().toISOString(),
          bio: 'New member',
          skills: ['JavaScript', 'React'],
          location: 'Your Location'
        }]
      } : g);
      setGroups(updatedGroups);

      // Add join message
      setGroupMessages(prev => ({
        ...prev,
        [groupId]: [...(prev[groupId] || []), {
          id: `msg-${Date.now()}`,
          userId: 'current-user',
          userName: 'You',
          message: 'joined the group',
          timestamp: new Date().toISOString(),
          type: 'system'
        }]
      }));

      // If this was triggered from the join error dialog, open the chat
      if (joinGroupError && joinGroupError.groupId === groupId) {
        setJoinGroupError(null);
        setSelectedGroup(group);
        setShowGroupDetails(true);
      }
    } catch (error) {
      console.error('Error joining study group:', error);
      setError('Failed to join study group. Please try again.');
    }
  };
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleSendMessage = (groupId: string) => {
    if (!newMessage.trim() && !selectedFile) return;
    const message: GroupMessage = {
      id: `msg-${Date.now()}`,
      userId: 'current-user',
      userName: 'You',
      message: newMessage.trim() || (selectedFile ? `Sent ${selectedFile.name}` : ''),
      timestamp: new Date().toISOString(),
      type: selectedFile ? 'file' : 'text',
      fileAttachment: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      } : undefined
    };
    setGroupMessages(prev => ({
      ...prev,
      [groupId]: [...(prev[groupId] || []), message]
    }));
    setNewMessage('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const getMemberAvatars = (members: GroupMember[]) => {
    return members.slice(0, 3).map((member, index) => <Avatar key={member.userId} className="w-8 h-8 -ml-2 first:ml-0 border-2 border-background">
        <AvatarImage src={member.avatar} />
        <AvatarFallback className="text-xs">
          {member.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>);
  };
  const isUserMember = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    return group?.members.some(member => member.userId === 'current-user') || false;
  };
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (fileType.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const handleChatAccess = (group: StudyGroupType) => {
    if (!isUserMember(group.id)) {
      setJoinGroupError({
        message: 'Please join the group first to send messages.',
        groupName: group.name,
        groupId: group.id
      });
      return;
    }
    setSelectedGroup(group);
    setShowGroupDetails(true);
  };
  if (isLoading) {
    return <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <Card key={i} className="glass-card">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>;
  }
  if (error) {
    return <div className="space-y-6">
        <Card className="glass-card border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertCircle className="w-5 h-5 mr-2" />
              Error Loading Study Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Study Groups</h2>
          <p className="text-muted-foreground">Join groups to collaborate and learn together</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="btn-primary bg-red-400 hover:bg-red-300">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Error Display */}
      {error && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
          <Button variant="ghost" size="sm" onClick={() => setError(null)} className="ml-auto text-destructive hover:bg-destructive/20">
            <X className="w-4 h-4" />
          </Button>
        </motion.div>}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search groups..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Frontend Development">Frontend Development</SelectItem>
            <SelectItem value="Backend Development">Backend Development</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Create Group Form */}
      {showCreateForm && <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Create New Study Group</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowCreateForm(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Group Name *</label>
              <Input placeholder="Enter group name" value={newGroup.name} onChange={e => setNewGroup(prev => ({
            ...prev,
            name: e.target.value
          }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Description *</label>
              <Textarea placeholder="Describe your group" value={newGroup.description} onChange={e => setNewGroup(prev => ({
            ...prev,
            description: e.target.value
          }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Category *</label>
              <Select value={newGroup.category} onValueChange={value => setNewGroup(prev => ({
            ...prev,
            category: value
          }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                  <SelectItem value="Backend Development">Backend Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Max Members</label>
              <Input type="number" min="2" max="50" value={newGroup.maxMembers} onChange={e => setNewGroup(prev => ({
            ...prev,
            maxMembers: parseInt(e.target.value) || 10
          }))} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateGroup} className="btn-primary">
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Group
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>}

      {/* Group Details Modal */}
      {showGroupDetails && selectedGroup && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowGroupDetails(false)}>
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="glass-card rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedGroup.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowGroupDetails(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="messages" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages" className="h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-2 mb-4 p-4 bg-muted/20 rounded-lg">
                  {(groupMessages[selectedGroup.id] || []).map(message => <div key={message.id} className={`flex ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${message.type === 'system' ? 'bg-blue-500/10 text-blue-600 text-center text-sm' : message.userId === 'current-user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {message.type === 'system' ? <span>{message.message}</span> : message.type === 'file' ? <div>
                            <div className="text-xs opacity-70 mb-1">{message.userName}</div>
                            <div className="flex items-center space-x-2">
                              {getFileIcon(message.fileAttachment?.type || '')}
                              <span className="text-sm">{message.fileAttachment?.name}</span>
                              <span className="text-xs opacity-70">({formatFileSize(message.fileAttachment?.size || 0)})</span>
                            </div>
                          </div> : <>
                            <div className="text-xs opacity-70 mb-1">{message.userName}</div>
                            <div>{message.message}</div>
                          </>}
                      </div>
                    </div>)}
                </div>
                <div className="space-y-2">
                  {selectedFile && <div className="flex items-center space-x-2 p-2 bg-muted/20 rounded-lg">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">{selectedFile.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>}
                  <div className="flex gap-2">
                    <Input placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage(selectedGroup.id)} />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleSendMessage(selectedGroup.id)}>
                      <Send className="w-4 h-4" />
                    </Button>
                    <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="members" className="space-y-4">
                <div className="grid gap-4">
                  {selectedGroup.members.map(member => <div key={member.userId} className={`flex items-center justify-between p-4 rounded-lg ${member.isCreator ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20' : 'bg-muted/20'}`}>
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {member.isCreator && <Crown className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{member.name}</span>
                            {member.isCreator && <Badge variant="secondary" className="bg-yellow-500 text-yellow-900">
                                <Crown className="w-3 h-3 mr-1" />
                                Creator
                              </Badge>}
                            <Badge variant="outline">{member.role}</Badge>
                          </div>
                          {member.bio && <p className="text-sm text-muted-foreground mt-1">{member.bio}</p>}
                          {member.skills && member.skills.length > 0 && <div className="flex flex-wrap gap-1 mt-2">
                              {member.skills.slice(0, 3).map(skill => <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>)}
                              {member.skills.length > 3 && <Badge variant="outline" className="text-xs">
                                  +{member.skills.length - 3}
                                </Badge>}
                            </div>}
                          {member.location && <div className="flex items-center space-x-1 mt-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{member.location}</span>
                            </div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{member.contributionScore} pts</Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {new Date(member.lastActive).toLocaleDateString()}
                        </div>
                      </div>
                    </div>)}
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedGroup.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Category</h4>
                    <Badge>{selectedGroup.category}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Created</h4>
                    <p className="text-muted-foreground">
                      {new Date(selectedGroup.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {selectedGroup.meetingSchedule && <div>
                    <h4 className="font-medium mb-2">Meeting Schedule</h4>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedGroup.meetingSchedule}</span>
                    </div>
                    {selectedGroup.nextMeeting && <div className="mt-2 text-sm text-muted-foreground">
                        Next meeting: {new Date(selectedGroup.nextMeeting).toLocaleString()}
                      </div>}
                  </div>}
                <div>
                  <h4 className="font-medium mb-2">Activity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedGroup.totalMessages} messages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <File className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedGroup.totalFiles} files shared</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGroup.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Group Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/20 p-3 rounded-lg">
                      <div className="text-2xl font-bold">{selectedGroup.members.length}</div>
                      <div className="text-sm text-muted-foreground">Members</div>
                    </div>
                    <div className="bg-muted/20 p-3 rounded-lg">
                      <div className="text-2xl font-bold">{selectedGroup.maxMembers}</div>
                      <div className="text-sm text-muted-foreground">Max Capacity</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>}

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map(group => <motion.div key={group.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
            <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => {
                setSelectedGroup(group);
                // Show group info instead of chat
                setShowGroupDetails(true);
              }}>
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{group.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {group.members.length}/{group.maxMembers}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {getMemberAvatars(group.members)}
                      {group.members.length > 3 && <span className="text-xs text-muted-foreground">
                          +{group.members.length - 3} more
                        </span>}
                    </div>
                    <div className="flex items-center space-x-2">
                      {isUserMember(group.id) ? <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Member
                        </Badge> : <Button size="sm" onClick={() => handleJoinGroup(group.id)} disabled={group.members.length >= group.maxMembers} className="w-24">
                          Join Group
                        </Button>}
                      <Button variant="outline" size="sm" onClick={() => handleChatAccess(group)}>
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {group.tags.slice(0, 3).map(tag => <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>)}
                    {group.tags.length > 3 && <Badge variant="outline" className="text-xs">
                        +{group.tags.length - 3}
                      </Badge>}
                  </div>
                  
                  {/* Group Creation Info */}
                  <div className="pt-3 border-t border-muted/20">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>Created by {group.members.find(m => m.isCreator)?.name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(group.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>)}
      </div>

      {filteredGroups.length === 0 && <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No groups found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or create a new group
          </p>
        </div>}

      {/* Join Group Error Modal */}
      {joinGroupError && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setJoinGroupError(null)}>
          <motion.div initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} className="glass-card rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Join {joinGroupError.groupName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {joinGroupError.message}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => handleJoinGroup(joinGroupError.groupId)} className="flex-1">
                Join Now
              </Button>
              <Button variant="outline" onClick={() => setJoinGroupError(null)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>}
    </div>;
};