import React from 'react';
import { motion } from 'framer-motion';

interface StatProps {
  number: string;
  label: string;
}

export default function Stat({ number, label }: StatProps) {
  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="text-indigo-600 font-semibold">{number}</span>
      </div>
      <span className="text-gray-600">{label}</span>
    </motion.div>
  );
}