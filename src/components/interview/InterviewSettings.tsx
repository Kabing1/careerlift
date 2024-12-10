import React from 'react';
import { Settings, Briefcase, Clock, MessageSquare } from 'lucide-react';

interface InterviewSettingsProps {
  onStart: (settings: {
    jobRole: string;
    duration: number;
    difficulty: string;
    focusAreas: string[];
  }) => void;
}

export default function InterviewSettings({ onStart }: InterviewSettingsProps) {
  const [settings, setSettings] = React.useState({
    jobRole: '',
    duration: 15,
    difficulty: 'intermediate',
    focusAreas: ['technical', 'behavioral'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(settings);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">Interview Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Target Job Role
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="input-field pl-10"
              placeholder="e.g., Senior Software Engineer"
              value={settings.jobRole}
              onChange={(e) => setSettings({ ...settings, jobRole: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Interview Duration
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              className="input-field pl-10"
              value={settings.duration}
              onChange={(e) => setSettings({ ...settings, duration: Number(e.target.value) })}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              className="input-field pl-10"
              value={settings.difficulty}
              onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
            >
              <option value="beginner">Entry Level</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Focus Areas
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['technical', 'behavioral', 'leadership', 'problem-solving'].map((area) => (
              <label key={area} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={settings.focusAreas.includes(area)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSettings({
                        ...settings,
                        focusAreas: [...settings.focusAreas, area],
                      });
                    } else {
                      setSettings({
                        ...settings,
                        focusAreas: settings.focusAreas.filter((a) => a !== area),
                      });
                    }
                  }}
                />
                <span className="text-sm text-gray-700 capitalize">{area}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          Start Interview
        </button>
      </form>
    </div>
  );
}