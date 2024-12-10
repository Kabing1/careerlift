import React from 'react';
import { Check, Star, Building, Zap, Rocket } from 'lucide-react';
import Price from './Price';
import CurrencySelector from './CurrencySelector';

const tiers = [
  {
    name: 'Free Starter',
    description: 'Essential tools to start your job search',
    price: 0,
    features: [
      'Essential CV Builder (3 Templates)',
      'Basic Cover Letter Assistant',
      '1 Practice Interview (10 Questions)',
      'Email Support',
      'Job Search Tips',
    ],
    cta: 'Start Free',
    featured: false,
    icon: Zap,
  },
  {
    name: 'Career Builder',
    description: 'Perfect for active job seekers',
    price: 15,
    yearlyPrice: 120,
    features: [
      '25+ Premium CV Templates',
      'Smart Cover Letter Generator',
      'Unlimited Practice Interviews',
      'Job Match Analytics',
      'Interview Performance Tracking',
      'Priority Email Support',
      'Career Path Planning',
    ],
    cta: 'Start 7-Day Trial',
    featured: true,
    icon: Star,
    savings: '33%',
  },
  {
    name: 'Career Pro',
    description: 'Advanced tools for career advancement',
    price: 29,
    yearlyPrice: 290,
    features: [
      'Everything in Career Builder',
      'AI-Powered Resume Optimization',
      'Advanced Interview Coaching',
      'ATS Score Checker',
      'Personal Brand Builder',
      'LinkedIn Profile Optimization',
      '1-on-1 Career Consultation',
    ],
    cta: 'Upgrade to Pro',
    featured: false,
    icon: Rocket,
    savings: '17%',
  },
  {
    name: 'Business Suite',
    description: 'Custom solutions for organizations',
    price: null,
    features: [
      'All Pro Features',
      'Team Management Portal',
      'White-Label Options',
      'Priority Support',
      'Custom Integration',
      'Usage Analytics',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    featured: false,
    icon: Building,
  },
];

const payPerUse = [
  {
    name: 'CV Creation',
    price: 5,
    description: 'Professional CV with one template',
  },
  {
    name: 'Cover Letter',
    price: 8,
    description: 'Customized cover letter for one job',
  },
  {
    name: 'Interview Prep',
    price: 12,
    description: 'One mock interview with AI feedback',
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  return (
    <div id="pricing" className="bg-gradient-to-b from-gray-900 to-indigo-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose your success path
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Land your dream job faster with our AI-powered career tools. Users see 3x more interviews and 40% faster job placement.
          </p>
        </div>

        <div className="mt-8 flex justify-center items-center gap-4">
          <div className="relative flex rounded-full bg-gray-800 p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex items-center rounded-full px-4 py-2 text-sm font-medium ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center rounded-full px-4 py-2 text-sm font-medium ${
                billingCycle === 'yearly'
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-700">
                Save up to 33%
              </span>
            </button>
          </div>
          <CurrencySelector />
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col ${
                tier.featured
                  ? 'ring-2 ring-indigo-500 bg-gray-800'
                  : 'ring-1 ring-white/10 bg-white/5'
              } rounded-3xl p-8 xl:p-10 transition-transform hover:scale-105`}
            >
              <div className="flex items-center gap-x-4">
                <tier.icon className="h-6 w-6 text-indigo-400" />
                <h3 className="text-lg font-semibold leading-8 text-white">
                  {tier.name}
                </h3>
                {tier.featured && (
                  <span className="inline-flex items-center rounded-md bg-indigo-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-indigo-600">
                    Most Popular
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {tier.description}
              </p>
              <div className="mt-8 flex items-baseline gap-x-2">
                {tier.price !== null ? (
                  <>
                    <Price
                      amount={billingCycle === 'monthly' ? tier.price : (tier.yearlyPrice || tier.price * 12)}
                      className="text-4xl font-bold tracking-tight text-white"
                    />
                    <span className="text-base text-gray-300">
                      /{billingCycle === 'monthly' ? 'mo' : 'year'}
                    </span>
                    {tier.savings && billingCycle === 'yearly' && (
                      <span className="ml-2 text-sm text-indigo-400">
                        Save {tier.savings}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-2xl font-bold tracking-tight text-white">
                    Custom pricing
                  </span>
                )}
              </div>

              <button
                className={`mt-8 w-full rounded-md px-3 py-3 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.featured
                    ? 'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                }`}
              >
                {tier.cta}
              </button>

              <ul className="mt-10 space-y-4 text-sm leading-6 text-gray-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-indigo-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
            <h3 className="text-lg font-semibold leading-8 text-white">
              Pay-As-You-Go Options
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              Flexible options with no commitment required
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {payPerUse.map((option) => (
                <div
                  key={option.name}
                  className="rounded-lg bg-white/5 p-4 hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-white font-medium">{option.name}</h4>
                  <p className="mt-1 text-sm text-gray-300">{option.description}</p>
                  <Price
                    amount={option.price}
                    className="mt-2 text-indigo-400 font-semibold"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="mt-8 flex justify-center gap-4">
            <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
              Compare all features <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}