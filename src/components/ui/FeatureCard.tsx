import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AppPage } from '@/App';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
  page: AppPage;
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  className = '' 
}: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("group cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg", className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      aria-label={`Learn more about ${title}`}
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 opacity-25 blur transition duration-500 group-hover:opacity-75" />
        <div className="relative bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white mx-auto mb-4">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center">{title}</h3>
          <p className="mt-2 text-gray-600 text-center">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}