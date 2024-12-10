import React from 'react';
import { motion } from 'framer-motion';
import CareerRoadmap from './CareerRoadmap';
import SkillAnalysis from './SkillAnalysis';
import JobCompatibility from './JobCompatibility';
import IndustryInsights from './IndustryInsights';
import GrowthTracker from './GrowthTracker';

export default function CareerDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <div className="text-center">
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
          >
            Your Career Dashboard
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600"
          >
            Track your progress and get personalized recommendations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <CareerRoadmap />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SkillAnalysis />
          </motion.div>
          <motion.div variants={itemVariants}>
            <JobCompatibility />
          </motion.div>
          <motion.div variants={itemVariants}>
            <IndustryInsights />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <GrowthTracker />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}