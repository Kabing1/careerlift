import { z } from 'zod';

export const PlanType = {
  FREE: 'FREE',
  CAREER_BUILDER: 'CAREER_BUILDER',
  CAREER_PRO: 'CAREER_PRO',
  BUSINESS: 'BUSINESS',
  PAY_AS_YOU_GO: 'PAY_AS_YOU_GO',
} as const;

export const planSchema = z.object({
  id: z.string(),
  type: z.enum([
    PlanType.FREE,
    PlanType.CAREER_BUILDER,
    PlanType.CAREER_PRO,
    PlanType.BUSINESS,
    PlanType.PAY_AS_YOU_GO,
  ]),
  name: z.string(),
  price: z.number(),
  billingCycle: z.enum(['monthly', 'yearly', 'one-time']),
  features: z.array(z.string()),
  limits: z.object({
    cvTemplates: z.number(),
    mockInterviews: z.number(),
    coverLetters: z.number(),
  }),
});

export type Plan = z.infer<typeof planSchema>;

export const plans: Plan[] = [
  {
    id: 'free',
    type: PlanType.FREE,
    name: 'Free Starter',
    price: 0,
    billingCycle: 'monthly',
    features: [
      'Essential CV Builder (3 Templates)',
      'Basic Cover Letter Assistant',
      '1 Practice Interview (10 Questions)',
      'Email Support',
    ],
    limits: {
      cvTemplates: 3,
      mockInterviews: 1,
      coverLetters: 1,
    },
  },
  {
    id: 'career-builder',
    type: PlanType.CAREER_BUILDER,
    name: 'Career Builder',
    price: 15,
    billingCycle: 'monthly',
    features: [
      '25+ Premium CV Templates',
      'Smart Cover Letter Generator',
      'Unlimited Practice Interviews',
      'Job Match Analytics',
      'Interview Performance Tracking',
    ],
    limits: {
      cvTemplates: 25,
      mockInterviews: -1, // unlimited
      coverLetters: -1, // unlimited
    },
  },
  {
    id: 'career-pro',
    type: PlanType.CAREER_PRO,
    name: 'Career Pro',
    price: 29,
    billingCycle: 'monthly',
    features: [
      'Everything in Career Builder',
      'AI-Powered Resume Optimization',
      'Advanced Interview Coaching',
      'ATS Score Checker',
      'Personal Brand Builder',
    ],
    limits: {
      cvTemplates: -1, // unlimited
      mockInterviews: -1, // unlimited
      coverLetters: -1, // unlimited
    },
  },
];

export function getPlanById(planId: string): Plan | undefined {
  return plans.find(plan => plan.id === planId);
}

export function checkFeatureAccess(plan: Plan, feature: string): boolean {
  return plan.features.includes(feature);
}

export function checkResourceLimit(plan: Plan, resource: keyof Plan['limits'], current: number): boolean {
  const limit = plan.limits[resource];
  return limit === -1 || current < limit;
}