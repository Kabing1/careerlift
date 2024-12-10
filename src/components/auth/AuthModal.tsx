import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useStore } from '@/lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
  onSuccess?: () => void;
}

function AuthModal({ 
  isOpen, 
  onClose, 
  initialView = 'login',
  onSuccess 
}: AuthModalProps) {
  const [view, setView] = React.useState(initialView);
  const { setUser } = useStore();

  const handleAuthSuccess = (user: any) => {
    setUser(user);
    onSuccess?.();
    onClose();
  };

  const handleSocialAuth = async (provider: 'google' | 'linkedin') => {
    try {
      const response = await fetch(`/api/auth/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Authentication failed');
      
      const data = await response.json();
      handleAuthSuccess(data.user);
    } catch (error) {
      console.error('Social auth error:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold">
                  {view === 'login' ? 'Sign In' : 'Create Account'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover:bg-gray-100 rounded-full p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6">
                {/* Social Auth Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => handleSocialAuth('google')}
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => handleSocialAuth('linkedin')}
                  >
                    <img src="https://www.linkedin.com/favicon.ico" alt="LinkedIn" className="w-5 h-5" />
                    Continue with LinkedIn
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {view === 'login' ? (
                  <LoginForm onSuccess={handleAuthSuccess} />
                ) : (
                  <RegisterForm onSuccess={handleAuthSuccess} />
                )}
                
                <div className="mt-4 text-center">
                  {view === 'login' ? (
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <button
                        onClick={() => setView('register')}
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <button
                        onClick={() => setView('login')}
                        className="text-indigo-600 hover:text-indigo-500 font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default React.memo(AuthModal);