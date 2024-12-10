import React from 'react';
import { Menu, X, Briefcase, FileText, Target, Video, Network, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import AuthModal from './auth/AuthModal';
import { useStore } from '../lib/store';
import { AppPage } from '../App';

interface NavbarProps {
  onNavigate: (page: AppPage) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const { isAuthenticated, signOut } = useStore();

  const navItems = [
    { id: 'career-analysis', name: 'Career Analysis', icon: Target },
    { id: 'mock-interview', name: 'Mock Interview', icon: Video },
    { id: 'job-matching', name: 'Job Matching', icon: Network },
  ];

  const handleNavigation = (page: AppPage) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
              onClick={() => handleNavigation('home')}
            >
              <Briefcase className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold text-gray-900">CareerLift</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as AppPage)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </button>
              ))}
              <Button
                variant={isAuthenticated ? 'secondary' : 'primary'}
                size="sm"
                onClick={handleAuthClick}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {isAuthenticated ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-b"
            >
              <div className="container mx-auto px-4 py-3 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id as AppPage)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-base font-medium ${
                      currentPage === item.id
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </button>
                ))}
                <Button
                  variant={isAuthenticated ? 'secondary' : 'primary'}
                  className="w-full mt-4 flex items-center justify-center gap-2"
                  onClick={handleAuthClick}
                >
                  <User className="h-4 w-4" />
                  {isAuthenticated ? 'Sign Out' : 'Sign In'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}