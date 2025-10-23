import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { User, Mail, Building, Edit, Save, Camera, Settings, Bell, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();

  // Use authenticated user data or fallback to demo data
  const fallbackData = {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    role: 'Senior Developer',
    company: 'TechCorp',
    experience: '5 years',
    interests: ['Full Stack Development'],
    avatar: '/placeholder.svg',
  };

  const userData = user || fallbackData;
  const fullName = userData.name || 'User';
  const nameParts = fullName.split(' ');
  const initials = nameParts.map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-32 h-32 border-4 border-primary/20">
                        <AvatarImage src={userData.avatar} alt={fullName} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <h1 className="text-2xl font-poppins font-bold text-foreground">{fullName}</h1>
                      <p className="text-muted-foreground">{userData.role} at {userData.company}</p>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{userData.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{userData.role}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{userData.company}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{userData.experience || 'N/A'} experience</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {userData.interests && Array.isArray(userData.interests) && userData.interests.map((interest, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        {userData.role}
                      </Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className="glass-card"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                    {isEditing && (
                      <Button className="btn-primary">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="glass-card">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Personal Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          defaultValue={userData.name}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={userData.email}
                          disabled={!isEditing}
                        />
                      </div>

                    </CardContent>
                  </Card>

                  {/* Professional Information */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building className="w-5 h-5" />
                        <span>Professional Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          defaultValue={userData.role}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          defaultValue={userData.company}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue defaultValue={userData.experience} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="2-3">2-3 years</SelectItem>
                            <SelectItem value="4-5">4-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="interests">Primary Interests</Label>
                        <Input
                          id="interests"
                          defaultValue={Array.isArray(userData.interests) ? userData.interests.join(', ') : ''}
                          disabled={!isEditing}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bio */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      defaultValue={`Passionate ${userData.role} with ${userData.experience || 'several years'} of experience. Always eager to learn new skills and contribute to innovative projects.`}
                      rows={4}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Account Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Dark Mode</h4>
                        <p className="text-sm text-muted-foreground">Use dark theme for better experience</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { title: 'Job Matches', description: 'Get notified about new job opportunities' },
                      { title: 'Skill Updates', description: 'Receive updates about skill demand changes' },
                      { title: 'Learning Reminders', description: 'Get reminded about your learning goals' },
                      { title: 'Market Insights', description: 'Receive weekly market trend reports' },
                    ].map((notification, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <Switch defaultChecked={index < 2} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Security Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <Input type="password" placeholder="Current password" />
                          <Input type="password" placeholder="New password" />
                          <Input type="password" placeholder="Confirm new password" />
                          <Button size="sm" className="btn-primary">
                            Update Password
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-glass-border/20">
                        <h4 className="font-semibold text-foreground mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline" className="glass-card">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile; 