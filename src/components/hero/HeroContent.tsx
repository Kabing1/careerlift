import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
  onGetStarted: () => void;
  onViewStories: () => void;
}

function HeroContent({ onGetStarted, onViewStories }: HeroContentProps) {
  const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, staggerChildren: 0.1 }
  };

  const childAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div
      variants={containerAnimation}
      initial="initial"
      animate="animate"
      className="max-w-3xl mx-auto text-center relative z-10"
    >
      <motion.div
        variants={childAnimation}
        className="inline-block mb-6 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
      >
        <span className="text-sm font-semibold text-[#FFD700]">
          AI-Powered Career Platform
        </span>
      </motion.div>

      <motion.h1
        variants={childAnimation}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight"
      >
        <span className="block text-white mb-4">
          Transform Your Career
        </span>
        <span className="block text-[#FFD700]">
          With AI-Powered Guidance
        </span>
      </motion.h1>

      <motion.p
        variants={childAnimation}
        className="text-xl text-[#F0F0F0] mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        Create professional CVs, ace interviews, and accelerate your career growth with personalized AI assistance
      </motion.p>

      <motion.div
        variants={childAnimation}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={onGetStarted}
          className="group relative px-8 py-3 text-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg shadow-xl shadow-[#4F46E5]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4F46E5]"
        >
          <span className="relative z-10 flex items-center justify-center">
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
        <button
          onClick={onViewStories}
          className="px-8 py-3 text-lg border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-300 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
        >
          View Success Stories
        </button>
      </motion.div>
    </motion.div>
  );
}

export default React.memo(HeroContent);