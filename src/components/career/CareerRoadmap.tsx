import React from 'react';
import { Map, Milestone, ArrowRight } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  completed: boolean;
}

export default function CareerRoadmap() {
  const [milestones] = React.useState<Milestone[]>([
    {
      id: '1',
      title: 'Complete Technical Assessment',
      description: 'Take online coding challenges and system design interviews',
      timeframe: '2 weeks',
      completed: true,
    },
    {
      id: '2',
      title: 'Build Portfolio Projects',
      description: 'Create 3 full-stack applications to showcase skills',
      timeframe: '1 month',
      completed: false,
    },
    {
      id: '3',
      title: 'Network with Industry Leaders',
      description: 'Connect with 5 professionals in target companies',
      timeframe: '2 months',
      completed: false,
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Map className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Career Roadmap</h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="relative pl-10">
              <div
                className={`absolute left-2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                  milestone.completed
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-white border-gray-300'
                }`}
              />
              <div className="bg-white rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                  <span className="text-sm text-gray-500">{milestone.timeframe}</span>
                </div>
                <p className="text-sm text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-6 w-full btn-primary flex items-center justify-center gap-2">
        Update Roadmap
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}