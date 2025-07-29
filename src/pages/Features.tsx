import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe,
  Smartphone,
  Database,
  Brain,
  Rocket
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Market Analysis',
      description: 'Real-time insights into skill demand, salary trends, and market opportunities using advanced AI algorithms.',
      benefits: ['Live market data', 'Predictive analytics', 'Salary benchmarking'],
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Target,
      title: 'Personalized Skill Tracking',
      description: 'Track your skills with precision and get personalized recommendations for career growth.',
      benefits: ['Skill assessment', 'Progress tracking', 'Gap analysis'],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: BookOpen,
      title: 'Adaptive Learning Paths',
      description: 'AI-curated learning paths that adapt to your goals, current skills, and market demands.',
      benefits: ['Customized courses', 'Learning recommendations', 'Progress tracking'],
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Users,
      title: 'Professional Networking',
      description: 'Connect with industry professionals, mentors, and peers in your field.',
      benefits: ['Mentor matching', 'Peer networking', 'Industry events'],
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive analytics and insights to track your career progress and market position.',
      benefits: ['Performance metrics', 'Market positioning', 'Career insights'],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Zap,
      title: 'Smart Job Matching',
      description: 'AI-powered job recommendations based on your skills, experience, and career goals.',
      benefits: ['Smart matching', 'Application tracking', 'Interview prep'],
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const capabilities = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Advanced ML algorithms power our market analysis and recommendations.',
    },
    {
      icon: Database,
      title: 'Real-time Data',
      description: 'Live data from thousands of job postings and market sources.',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Market insights from tech hubs worldwide.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Access your career insights anywhere, anytime.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security for your personal data.',
    },
    {
      icon: Rocket,
      title: 'Fast Performance',
      description: 'Lightning-fast analytics and real-time updates.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-gradient-cosmic rounded-full text-sm font-semibold text-foreground mb-6 border border-glass-border/30"
          >
            🚀 Powerful Features
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl lg:text-6xl font-poppins font-black mb-6"
          >
            Everything You Need to{' '}
            <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
              Succeed
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            SkillSphere combines cutting-edge AI with comprehensive career tools to give you the ultimate advantage in today's competitive job market.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="container mx-auto px-6 py-16"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card h-full hover:bg-glass/30 transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.bgColor} ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-poppins font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-sm text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capabilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="container mx-auto px-6 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-poppins font-black mb-4">
              Built with{' '}
              <span className="text-glow bg-gradient-secondary bg-clip-text text-transparent">
                Modern Technology
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages the latest technologies to deliver exceptional performance and insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card text-center p-6">
                  <div className="w-12 h-12 bg-glass/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <capability.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="container mx-auto px-6 py-16"
        >
          <Card className="glass-card text-center p-12">
            <h2 className="text-3xl font-poppins font-black mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already using SkillSphere to accelerate their career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-4">
                Start Free Trial
              </Button>
              <Button variant="outline" className="glass-card text-lg px-8 py-4">
                View Demo
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Features; 