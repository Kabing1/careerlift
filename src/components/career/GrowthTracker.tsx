import React from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  change: number;
  icon: React.ElementType;
}

export default function GrowthTracker() {
  const metrics: Metric[] = [
    {
      label: 'Interview Score',
      value: 85,
      change: 15,
      icon: Target,
    },
    {
      label: 'Skills Mastered',
      value: 12,
      change: 3,
      icon: Award,
    },
    {
      label: 'Applications',
      value: 25,
      change: 8,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Growth Tracker</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-gray-50 rounded-lg p-4 flex items-center gap-4"
          >
            <div className="h-12 w-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <metric.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </span>
                {metric.change > 0 && (
                  <span className="text-sm text-green-600">
                    +{metric.change}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Achievements</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="h-4 w-4 text-indigo-600" />
            <span>Completed Advanced React Course</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="h-4 w-4 text-indigo-600" />
            <span>Achieved 90% in Mock Interview</span>
          </div>
        </div>
      </div>
    </div>
  );
}