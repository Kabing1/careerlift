import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  required: number;
  courses: Array<{
    title: string;
    provider: string;
    url: string;
  }>;
}

export default function SkillAnalysis() {
  const [skills] = React.useState<Skill[]>([
    {
      name: 'React.js',
      level: 85,
      required: 90,
      courses: [
        {
          title: 'Advanced React Patterns',
          provider: 'Frontend Masters',
          url: '#',
        },
      ],
    },
    {
      name: 'System Design',
      level: 65,
      required: 80,
      courses: [
        {
          title: 'System Design for Senior Engineers',
          provider: 'Educative',
          url: '#',
        },
      ],
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold">Skill Analysis</h2>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">{skill.name}</h3>
              <span className="text-sm text-gray-500">
                {skill.level}% / {skill.required}% required
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${(skill.level / skill.required) * 100}%` }}
              />
            </div>
            {skill.courses.length > 0 && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Recommended Courses
                </h4>
                {skill.courses.map((course) => (
                  <a
                    key={course.title}
                    href={course.url}
                    className="flex items-center justify-between text-sm hover:bg-gray-100 p-2 rounded"
                  >
                    <span className="text-gray-700">{course.title}</span>
                    <span className="text-gray-500">{course.provider}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}