import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-lg font-poppins font-black text-primary-foreground">S</span>
            </div>
            <span className="text-2xl font-poppins font-black text-glow">SkillSphere</span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`font-lato font-medium transition-all duration-300 hover:text-primary ${
                  item.active 
                    ? 'text-primary text-glow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button className="btn-primary rounded-xl px-6 py-2">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};