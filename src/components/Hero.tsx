import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { SkillGauge } from './SkillGauge';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-block px-4 py-2 bg-gradient-cosmic rounded-full text-sm font-semibold text-foreground mb-6 border border-glass-border/30"
            >
              🚀 AI-Powered Career Intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-5xl lg:text-7xl font-poppins font-black mb-6 leading-tight"
            >
              Master the{' '}
              <span className="text-glow bg-gradient-primary bg-clip-text text-transparent">
                Future
              </span>{' '}
              of Work
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl"
            >
              Transform career uncertainty into strategic advantage. Get AI-driven insights on skill demand, salary trends, and personalized learning roadmaps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/dashboard">
                <Button className="btn-primary rounded-xl px-8 py-4 text-lg font-semibold">
                  Explore Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="rounded-xl px-8 py-4 text-lg font-semibold border-glass-border bg-glass/20 backdrop-blur-sm hover:bg-glass/30 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex justify-center lg:justify-start gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Jobs Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-secondary">200+</div>
                <div className="text-sm text-muted-foreground">Skills Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-poppins font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Skill Gauge */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center"
          >
            <SkillGauge 
              value={87} 
              label="AI/ML Demand Index" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};