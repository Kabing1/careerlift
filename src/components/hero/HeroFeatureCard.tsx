import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AppPage } from '../../App';

interface HeroFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  page: AppPage;
  index: number;
  onClick: () => void;
}

export default function HeroFeatureCard({
  icon: Icon,
  title,
  description,
  index,
  onClick,
}: HeroFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer relative"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
      <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-lg p-6 backdrop-blur-sm border border-indigo-200/10 shadow-xl">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white mx-auto mb-4 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2 text-center group-hover:text-indigo-200 transition-colors">
          {title}
        </h3>
        <p className="text-indigo-100/80 text-center group-hover:text-indigo-100 transition-colors">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-center gap-1 font-medium">
          <span className="bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent group-hover:from-white group-hover:to-indigo-200 transition-all">
            Learn more
          </span>
          <ArrowRight className="h-4 w-4 text-indigo-200 group-hover:text-white transition-colors group-hover:translate-x-1 transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
}