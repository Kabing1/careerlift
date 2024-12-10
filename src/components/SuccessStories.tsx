import React from 'react';
import { Star, Briefcase, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const stories = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'Tech Corp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    quote: 'The AI interview practice helped me ace my dream job interview. The real-time feedback was invaluable.',
    improvement: '45% higher interview success rate',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    company: 'Innovation Labs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    quote: 'The CV builder helped me highlight my achievements in a way that caught recruiters\' attention.',
    improvement: '3x more interview calls',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Marketing Director',
    company: 'Global Brands',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    quote: 'The personalized career roadmap gave me clear direction on how to achieve my career goals.',
    improvement: 'Secured 40% higher salary',
  },
];

export default function SuccessStories() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Success Stories
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Real stories from professionals who transformed their careers using CareerLift
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{story.name}</h3>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {story.role}
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {story.company}
                    </div>
                  </div>
                </div>
              </div>

              <blockquote className="text-gray-700 mb-6">
                "{story.quote}"
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-indigo-600">
                  {story.improvement}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}