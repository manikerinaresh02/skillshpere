import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';
import { SkillProgress } from '@/components/dashboard/SkillProgress';
import { MarketInsights } from '@/components/dashboard/MarketInsights';
import { LearningPath } from '@/components/dashboard/LearningPath';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'skills', label: 'Skills', icon: '🎯' },
    { id: 'market', label: 'Market', icon: '📈' },
    { id: 'learning', label: 'Learning', icon: '📚' },
    { id: 'activity', label: 'Activity', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        <DashboardHeader />
        
        {/* Tab Navigation */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex space-x-1 glass-card rounded-xl p-1 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-glass/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && <AnalyticsOverview />}
            {activeTab === 'skills' && <SkillProgress />}
            {activeTab === 'market' && <MarketInsights />}
            {activeTab === 'learning' && <LearningPath />}
            {activeTab === 'activity' && <RecentActivity />}
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard; 