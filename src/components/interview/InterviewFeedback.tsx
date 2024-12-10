import React from 'react';
import { BarChart2, ThumbsUp, AlertCircle } from 'lucide-react';

interface FeedbackMetric {
  category: string;
  score: number;
  feedback: string;
  suggestions: string[];
}

interface InterviewFeedbackProps {
  metrics: FeedbackMetric[];
  overallScore: number;
  transcript: string;
}

export default function InterviewFeedback({ metrics, overallScore, transcript }: InterviewFeedbackProps) {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Overall Performance</h2>
          </div>
          <div className="flex items-center gap-2">
            {overallScore >= 70 ? (
              <ThumbsUp className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            <span className="text-2xl font-bold">{overallScore}%</span>
          </div>
        </div>

        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              overallScore >= 70 ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Detailed Feedback</h2>
        <div className="space-y-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">{metric.category}</h3>
                <span className="text-sm font-medium text-gray-500">{metric.score}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${metric.score}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{metric.feedback}</p>
              {metric.suggestions.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Improvement Suggestions
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {metric.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interview Transcript */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Interview Transcript</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
            {transcript}
          </pre>
        </div>
      </div>
    </div>
  );
}