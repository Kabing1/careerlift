import React from 'react';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

interface Insight {
  category: string;
  value: string;
  trend: number;
  icon: React.ElementType;
}

export default function IndustryInsights() {
  const insights: Insight[] = [
    {
      category: 'Average Salary',
      value: '$120,000',
      trend: 5,
      icon: DollarSign,
    },
    {
      category: 'Job Openings',
      value: '1,250',
      trend: 12,
      icon: Users,
    },
    {
      category: 'Market Demand',
      value: 'High',
      trend: 8,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Industry Insights</h2>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.category}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <insight.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{insight.category}</p>
                <p className="font-semibold text-gray-900">{insight.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+{insight.trend}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Top Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'AWS', 'System Design'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}