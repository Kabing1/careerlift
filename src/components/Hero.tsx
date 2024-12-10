import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import HeroFeatureCard from './hero/HeroFeatureCard';
import { AppPage } from '../App';
import { useStore } from '../lib/store';
import AuthModal from './auth/AuthModal';
import { Briefcase, Target, Video } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: AppPage) => void;
}

function Hero({ onNavigate }: HeroProps) {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const { isAuthenticated } = useStore();

  const features = React.useMemo(() => [
    {
      icon: Briefcase,
      title: 'AI CV Builder',
      description: 'Create professional CVs tailored to your industry',
      page: 'cv-builder' as AppPage,
    },
    {
      icon: Target,
      title: 'Career Analysis',
      description: 'Get personalized career growth insights',
      page: 'career-analysis' as AppPage,
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Practice with AI-powered interviews',
      page: 'mock-interview' as AppPage,
    },
  ], []);

  const handleFeatureClick = React.useCallback((page: AppPage) => {
    if (isAuthenticated) {
      onNavigate(page);
    } else {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, onNavigate]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#2c3e50] to-[#4ca1af]">
      <HeroBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <HeroContent 
          onGetStarted={() => handleFeatureClick('cv-builder')}
          onViewStories={() => onNavigate('success-stories')}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <HeroFeatureCard
              key={feature.title}
              {...feature}
              index={index}
              onClick={() => handleFeatureClick(feature.page)}
            />
          ))}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default React.memo(Hero);