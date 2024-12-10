import React from 'react';
import { Target, Briefcase } from 'lucide-react';

interface JobMatch {
  title: string;
  company: string;
  compatibility: number;
  skills: Array<{
    name: string;
    match: number;
  }>;
}

export default function JobCompatibility() {
  const [jobs] = React.useState<JobMatch[]>([
    {
      title: 'Senior Frontend Engineer',
      company: 'Tech Corp',
      compatibility: 85,
      skills: [
        { name: 'React', match: 90 },
        { name: 'TypeScript', match: 85 },
        { name: 'System Design', match: 75 },
      ],
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Job Compatibility</h2>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.title} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-indigo-600">
                  {job.compatibility}%
                </div>
                <span className="text-sm text-gray-500">match</span>
              </div>
            </div>

            <div className="space-y-3">
              {job.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{skill.name}</span>
                    <span className="text-gray-500">{skill.match}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${skill.match}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full btn-primary flex items-center justify-center gap-2">
              <Briefcase className="h-4 w-4" />
              View Job Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}