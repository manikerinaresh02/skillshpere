import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Settings, Plus } from 'lucide-react';

export const DashboardHeader = () => {
  const user = {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: '/placeholder.svg',
    role: 'Senior Developer',
    company: 'TechCorp'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-2xl font-poppins font-bold text-foreground">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                {user.role} at {user.company} • Last updated 2 hours ago
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="glass-card">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="glass-card">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-glass-border/20">
          {[
            { label: 'Skills Tracked', value: '12', change: '+2', changeType: 'positive' },
            { label: 'Market Score', value: '87%', change: '+5%', changeType: 'positive' },
            { label: 'Learning Hours', value: '24h', change: '+8h', changeType: 'positive' },
            { label: 'Job Matches', value: '15', change: '+3', changeType: 'positive' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-poppins font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className={`text-xs font-semibold ${
                stat.changeType === 'positive' ? 'text-secondary' : 'text-destructive'
              }`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 