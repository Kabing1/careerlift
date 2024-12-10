import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CareerDashboard from './components/career/CareerDashboard';
import MockInterview from './components/interview/MockInterview';
import JobMatching from './components/networking/JobMatching';
import Pricing from './components/Pricing';
import CVBuilder from './components/cv-builder/CVBuilder';
import CoverLetterBuilder from './components/cover-letter/CoverLetterBuilder';
import SuccessStories from './components/SuccessStories';
import ErrorBoundary from './components/ErrorBoundary';
import { useStore } from './lib/store';

export type AppPage = 'home' | 'career-analysis' | 'mock-interview' | 'job-matching' | 
                      'cv-builder' | 'cover-letter' | 'success-stories';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<AppPage>('home');
  const { isAuthenticated } = useStore();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const handleNavigation = (page: AppPage) => {
    // Check if authentication is required for certain pages
    const authRequiredPages = ['career-analysis', 'mock-interview', 'cv-builder', 'cover-letter'];
    
    if (authRequiredPages.includes(page) && !isAuthenticated) {
      // Show login modal or redirect to login
      alert('Please sign in to access this feature');
      return;
    }
    
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <Hero onNavigate={handleNavigation} />
            <Features onNavigate={handleNavigation} />
            <Pricing />
          </motion.div>
        );
      case 'career-analysis':
        return (
          <motion.div
            key="career"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <CareerDashboard />
          </motion.div>
        );
      case 'mock-interview':
        return (
          <motion.div
            key="interview"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <MockInterview />
          </motion.div>
        );
      case 'job-matching':
        return (
          <motion.div
            key="jobs"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <JobMatching />
          </motion.div>
        );
      case 'cv-builder':
        return (
          <motion.div
            key="cv"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <CVBuilder />
          </motion.div>
        );
      case 'cover-letter':
        return (
          <motion.div
            key="cover-letter"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <CoverLetterBuilder />
          </motion.div>
        );
      case 'success-stories':
        return (
          <motion.div
            key="success"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <SuccessStories />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
        <main className="pt-16">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>
      </div>
    </ErrorBoundary>
  );
}