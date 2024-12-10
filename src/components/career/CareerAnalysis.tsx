import React from 'react';
import { TrendingUp, Book, Target, Award } from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number;
  relevance: number;
}

interface CareerGoal {
  role: string;
  timeline: string;
  requiredSkills: string[];
}

export default function CareerAnalysis() {
  const [currentSkills, setCurrentSkills] = React.useState<Skill[]>([]);
  const [careerGoal, setCareerGoal] = React.useState<CareerGoal>({
    role: '',
    timeline: '',
    requiredSkills: [],
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Career Roadmap
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Let AI analyze your profile and create a personalized career development plan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Career Goals Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Career Goals</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Senior Product Manager"
                  value={careerGoal.role}
                  onChange={(e) => setCareerGoal({ ...careerGoal, role: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeline
                </label>
                <select
                  className="input-field"
                  value={careerGoal.timeline}
                  onChange={(e) => setCareerGoal({ ...careerGoal, timeline: e.target.value })}
                >
                  <option value="">Select timeline</option>
                  <option value="6months">6 months</option>
                  <option value="1year">1 year</option>
                  <option value="2years">2 years</option>
                  <option value="5years">5 years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills Assessment */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Skills Assessment</h2>
            </div>
            <div className="space-y-4">
              {currentSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">
                      Relevance: {skill.relevance}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
              <button
                className="w-full mt-4 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                onClick={() => {/* Add skill modal logic */}}
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Learning Recommendations */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Book className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Learning Recommendations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Course Card */}
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                  alt="Course thumbnail"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Advanced Product Management
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Master the skills needed for senior product roles
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-indigo-600">Free</span>
                  <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Career Progress Tracker */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Career Progress</h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />
              <div className="space-y-8 relative">
                {/* Milestone Example */}
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 relative z-10" />
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900">Complete Advanced PM Course</h3>
                    <p className="text-sm text-gray-600">Estimated: 2 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}