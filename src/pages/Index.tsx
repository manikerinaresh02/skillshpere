import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { SkillsSection } from '@/components/SkillsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <SkillsSection />
      <Footer />
    </div>
  );
};

export default Index;
