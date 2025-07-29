import { motion } from 'framer-motion';
import { SkillCard } from './SkillCard';

export const SkillsSection = () => {
  const skillsData = [
    {
      skill: 'React Development',
      demand: 92,
      growth: 15.3,
      trendData: [65, 68, 72, 78, 85, 88, 92]
    },
    {
      skill: 'Python & AI/ML',
      demand: 89,
      growth: 23.7,
      trendData: [58, 63, 69, 75, 80, 86, 89]
    },
    {
      skill: 'Data Analysis',
      demand: 85,
      growth: 18.9,
      trendData: [62, 66, 70, 74, 78, 82, 85]
    },
    {
      skill: 'Cloud Computing',
      demand: 91,
      growth: 21.4,
      trendData: [60, 65, 71, 76, 82, 87, 91]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-secondary rounded-full text-sm font-semibold text-secondary-foreground mb-6"
          >
            🔥 Trending Skills
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-poppins font-black mb-6">
            Skills in{' '}
            <span className="text-glow bg-gradient-secondary bg-clip-text text-transparent">
              High Demand
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-time market intelligence reveals which skills are driving career growth. 
            Stay ahead with data-driven insights into tomorrow's opportunities.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={skill.skill}
              {...skill}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-poppins font-bold mb-4">
              Want to see your skill's market position?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get personalized insights and recommendations tailored to your career goals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary rounded-xl px-8 py-3 font-semibold"
            >
              Analyze My Skills
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};