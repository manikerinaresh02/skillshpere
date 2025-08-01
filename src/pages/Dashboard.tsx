import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { MarketInsights } from '../components/dashboard/MarketInsights';
import { SkillAssessment } from '../components/dashboard/SkillAssessment';
import { StudyGroup } from '../components/collaboration/StudyGroup';
import { LiveSession } from '../components/collaboration/LiveSession';
import { LearningRecommendations } from '../components/ai/LearningRecommendations';
import { LearningAnalytics } from '../components/analytics/LearningAnalytics';
import { Achievements } from '../components/gamification/Achievements';
import { LearningPath } from '../components/dashboard/LearningPath';
import { Footer } from '../components/Footer';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useAuth } from '../contexts/AuthContext';
import {
  BarChart3,
  TrendingUp,
  Brain,
  BookOpen,
  Activity,
  Users,
  Trophy,
  Video
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3 className="w-4 h-4" />,
      component: (
        <div className="space-y-6">
          <ErrorBoundary><DashboardHeader user={user} /></ErrorBoundary>
          <ErrorBoundary><MarketInsights /></ErrorBoundary>
        </div>
      )
    },
    {
      id: 'market',
      label: 'Market Insights',
      icon: <TrendingUp className="w-4 h-4" />,
      component: (<ErrorBoundary><MarketInsights /></ErrorBoundary>)
    },
    {
      id: 'skills',
      label: 'Skill Assessment',
      icon: <Brain className="w-4 h-4" />,
      component: (<ErrorBoundary><SkillAssessment /></ErrorBoundary>)
    },
    {
      id: 'collaboration',
      label: 'Study Groups',
      icon: <Users className="w-4 h-4" />,
      component: (<ErrorBoundary><StudyGroup /></ErrorBoundary>)
    },
    {
      id: 'live-sessions',
      label: 'Live Sessions',
      icon: <Video className="w-4 h-4" />,
      component: (<ErrorBoundary><LiveSession /></ErrorBoundary>)
    },
    {
      id: 'ai',
      label: 'AI Recommendations',
      icon: <Brain className="w-4 h-4" />,
      component: (<ErrorBoundary><LearningRecommendations /></ErrorBoundary>)
    },
    {
      id: 'analytics',
      label: 'Learning Analytics',
      icon: <Activity className="w-4 h-4" />,
      component: (<ErrorBoundary><LearningAnalytics /></ErrorBoundary>)
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: <Trophy className="w-4 h-4" />,
      component: (<ErrorBoundary><Achievements /></ErrorBoundary>)
    },
    {
      id: 'learning',
      label: 'Learning Path',
      icon: <BookOpen className="w-4 h-4" />,
      component: (<ErrorBoundary><LearningPath /></ErrorBoundary>)
    }
  ];

  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="container mx-auto px-6 py-8 pt-24">
        <div className="glass-card rounded-xl p-1 mb-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
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
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeComponent}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard; 