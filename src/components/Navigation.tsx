import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Home', href: '/', active: location.pathname === '/' },
    { label: 'Dashboard', href: '/dashboard', active: location.pathname === '/dashboard' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return null; // Don't show navigation on auth pages
  }

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
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-lg font-poppins font-black text-primary-foreground">S</span>
              </div>
              <span className="text-2xl font-poppins font-black text-glow">SkillSphere</span>
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Link
                  to={item.href}
                  className={`font-lato font-medium transition-all duration-300 hover:text-primary ${
                    item.active 
                      ? 'text-primary text-glow' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center space-x-3"
          >
            {location.pathname === '/dashboard' ? (
              <Link to="/profile">
                <Button variant="outline" className="glass-card">
                  Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="glass-card">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="btn-primary">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};