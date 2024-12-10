import React from 'react';
import { Target, Zap } from 'lucide-react';

interface CompatibilityProps {
  jobTitle: string;
  skills: { name: string; match: number }[];
  overallScore: number;
}

export default function JobCompatibilityScore({ jobTitle, skills, overallScore }: CompatibilityProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Job Compatibility</h2>
        </div>
        <div className="flex items-center gap-2">
          <Zap className={`h-5 w-5 ${overallScore >= 70 ? 'text-green-500' : 'text-yellow-500'}`} />
          <span className="text-2xl font-bold">{overallScore}%</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-gray-700">Match for: {jobTitle}</h3>
        
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{skill.name}</span>
                <span className={skill.match >= 70 ? 'text-green-600' : 'text-yellow-600'}>
                  {skill.match}% match
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    skill.match >= 70 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${skill.match}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}