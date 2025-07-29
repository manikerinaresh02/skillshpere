import { motion } from 'framer-motion';

export const Footer = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'API', 'Enterprise'],
    Resources: ['Documentation', 'Guides', 'Blog', 'Case Studies'],
    Company: ['About', 'Careers', 'Contact', 'Privacy'],
    Social: ['Twitter', 'LinkedIn', 'GitHub', 'Discord']
  };

  return (
    <footer className="relative py-16 border-t border-glass-border/20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-xl font-poppins font-black text-primary-foreground">S</span>
              </div>
              <span className="text-2xl font-poppins font-black text-glow">SkillSphere</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Empowering careers with AI-driven market intelligence. 
              Turn career uncertainty into strategic advantage with real-time insights.
            </p>

            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  viewport={{ once: true }}
                  className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <span className="text-sm font-bold">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              viewport={{ once: true }}
            >
              <h4 className="font-poppins font-bold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * linkIndex }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 font-lato"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-glass-border/20 pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 SkillSphere. All rights reserved. Built with 💙 for career growth.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};