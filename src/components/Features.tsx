import React from 'react';
import { FileText, PenTool, Video, Target, Zap, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppPage } from '../App';
import Button from './ui/Button';
import { useStore } from '../lib/store';
import AuthModal from './auth/AuthModal';

interface FeaturesProps {
  onNavigate: (page: AppPage) => void;
}

export default function Features({ onNavigate }: FeaturesProps) {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const { isAuthenticated } = useStore();

  const features = [
    {
      name: 'AI CV Builder',
      description: 'Create professional, ATS-optimized CVs tailored to specific job roles.',
      icon: FileText,
      page: 'cv-builder' as AppPage,
      image: 'https://images.unsplash.com/photo-1635350736475-c8cef4b21906?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
      benefits: ['ATS-friendly templates', 'Industry-specific keywords', 'Real-time suggestions'],
    },
    {
      name: 'Smart Cover Letters',
      description: 'Generate compelling, customized cover letters that showcase your unique value.',
      icon: PenTool,
      page: 'cover-letter' as AppPage,
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
      benefits: ['Personalized content', 'Industry insights', 'Professional tone'],
    },
    {
      name: 'Interview Coach',
      description: 'Practice with our AI interviewer and receive instant feedback on your responses.',
      icon: Video,
      page: 'mock-interview' as AppPage,
      image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
      benefits: ['Real-time feedback', 'Industry-specific questions', 'Performance analytics'],
    },
  ];

  const handleFeatureClick = (page: AppPage) => {
    if (isAuthenticated) {
      onNavigate(page);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Your Complete Career Success Toolkit
          </p>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Leverage AI-powered tools and expert guidance to stand out in today's competitive job market.
          </p>
        </div>

        <div className="mt-16 sm:mt-20 space-y-16 sm:space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 w-full">
                <div className="relative">
                  <div className="absolute -inset-4">
                    <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-indigo-600 to-blue-500" />
                  </div>
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="relative rounded-2xl shadow-xl w-full h-[300px] sm:h-[400px] object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{feature.name}</h3>
                <p className="text-base sm:text-lg text-gray-600">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-5 w-5 text-indigo-600">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  onClick={() => handleFeatureClick(feature.page)}
                  className="inline-flex items-center gap-2"
                >
                  Learn more
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          // Navigate to the last clicked feature after successful authentication
        }}
      />
    </div>
  );
}