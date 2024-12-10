import React from 'react';
import { Activity, Eye, Volume2, Smile, Move } from 'lucide-react';

interface RealTimeFeedbackProps {
  metrics: {
    confidence: number;
    clarity: number;
    eyeContact: number;
    bodyLanguage: number;
    tone: number;
  };
}

export default function RealTimeFeedback({ metrics }: RealTimeFeedbackProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Real-Time Analysis</h2>
      </div>

      <div className="space-y-4">
        {/* Confidence Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Smile className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Confidence</span>
            </div>
            <span className="text-sm font-medium">{metrics.confidence}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.confidence}%` }}
            />
          </div>
        </div>

        {/* Voice Clarity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Voice Clarity</span>
            </div>
            <span className="text-sm font-medium">{metrics.clarity}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.clarity}%` }}
            />
          </div>
        </div>

        {/* Eye Contact */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Eye Contact</span>
            </div>
            <span className="text-sm font-medium">{metrics.eyeContact}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.eyeContact}%` }}
            />
          </div>
        </div>

        {/* Body Language */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Move className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Body Language</span>
            </div>
            <span className="text-sm font-medium">{metrics.bodyLanguage}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.bodyLanguage}%` }}
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Tips</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Maintain natural eye contact
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Speak clearly and at a steady pace
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Use open and confident posture
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}