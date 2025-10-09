import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, BookOpen } from 'lucide-react';

export const SkillProgress = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills', count: 12 },
    { id: 'frontend', label: 'Frontend', count: 4 },
    { id: 'backend', label: 'Backend', count: 3 },
    { id: 'data', label: 'Data & AI', count: 3 },
    { id: 'devops', label: 'DevOps', count: 2 },
  ];

  const skills = [
    {
      id: 1,
      name: 'React.js',
      category: 'frontend',
      proficiency: 85,
      marketDemand: 92,
      growth: 15.3,
      lastUpdated: '2 days ago',
      status: 'expert',
      learningHours: 120,
      targetLevel: 90,
    },
    {
      id: 2,
      name: 'Python',
      category: 'backend',
      proficiency: 78,
      marketDemand: 89,
      growth: 23.7,
      lastUpdated: '1 week ago',
      status: 'advanced',
      learningHours: 95,
      targetLevel: 85,
    },
    {
      id: 3,
      name: 'AWS Cloud',
      category: 'devops',
      proficiency: 72,
      marketDemand: 91,
      growth: 21.4,
      lastUpdated: '3 days ago',
      status: 'intermediate',
      learningHours: 65,
      targetLevel: 80,
    },
    {
      id: 4,
      name: 'Machine Learning',
      category: 'data',
      proficiency: 68,
      marketDemand: 89,
      growth: 28.1,
      lastUpdated: '5 days ago',
      status: 'intermediate',
      learningHours: 45,
      targetLevel: 85,
    },
    {
      id: 5,
      name: 'TypeScript',
      category: 'frontend',
      proficiency: 82,
      marketDemand: 88,
      growth: 18.9,
      lastUpdated: '1 day ago',
      status: 'advanced',
      learningHours: 110,
      targetLevel: 90,
    },
    {
      id: 6,
      name: 'Node.js',
      category: 'backend',
      proficiency: 75,
      marketDemand: 86,
      growth: 12.5,
      lastUpdated: '4 days ago',
      status: 'advanced',
      learningHours: 88,
      targetLevel: 85,
    },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expert': return 'bg-primary text-primary-foreground';
      case 'advanced': return 'bg-secondary text-secondary-foreground';
      case 'intermediate': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'expert': return '⭐';
      case 'advanced': return '🚀';
      case 'intermediate': return '📈';
      default: return '📚';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Skill Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="glass-card"
                >
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-card hover:bg-glass/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{getStatusIcon(skill.status)}</span>
                      <span>{skill.name}</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Updated {skill.lastUpdated}
                    </p>
                  </div>
                  <Badge className={getStatusColor(skill.status)}>
                    {skill.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Proficiency Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Proficiency</span>
                    <span className="text-sm font-bold text-primary">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: {skill.targetLevel}%</span>
                    <span>{skill.learningHours}h learned</span>
                  </div>
                </div>

                {/* Market Demand */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Market Demand</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-secondary" />
                      <span className="text-sm font-bold text-secondary">+{skill.growth}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className="h-full bg-gradient-secondary rounded-full"
                      style={{ width: `${skill.marketDemand}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {skill.marketDemand}% demand in market
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 glass-card">
                    <Target className="w-3 h-3 mr-1" />
                    Practice
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 glass-card">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Learn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Skill CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="glass-card border-dashed border-2 border-primary/30 hover:border-primary/50 transition-colors duration-300">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">➕</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Add New Skill
            </h3>
            <p className="text-muted-foreground mb-4">
              Track your progress on new skills and get personalized learning recommendations
            </p>
            <Button className="btn-primary">
              Add Skill
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 