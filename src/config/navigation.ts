import { AppPage } from '@/App';

export const NAV_ITEMS = [
  { 
    id: 'career-analysis' as AppPage,
    name: 'Career Analysis',
    description: 'Get insights into your career path',
    requiresAuth: true
  },
  { 
    id: 'mock-interview' as AppPage,
    name: 'Mock Interview',
    description: 'Practice with AI interviewer',
    requiresAuth: true
  },
  { 
    id: 'job-matching' as AppPage,
    name: 'Job Matching',
    description: 'Find your perfect role',
    requiresAuth: false
  },
  {
    id: 'cv-builder' as AppPage,
    name: 'CV Builder',
    description: 'Create professional CVs',
    requiresAuth: true
  },
  {
    id: 'cover-letter' as AppPage,
    name: 'Cover Letter',
    description: 'Generate tailored cover letters',
    requiresAuth: true
  }
] as const;