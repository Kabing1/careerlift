import React from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

interface Question {
  category: string;
  questions: Array<{
    question: string;
    tips: string[];
  }>;
}

export default function BehavioralQuestions() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const questions: Question[] = [
    {
      category: 'Leadership',
      questions: [
        {
          question: 'Tell me about a time when you had to lead a difficult team through a change.',
          tips: [
            'Use the STAR method',
            'Focus on how you influenced others',
            'Highlight the positive outcome',
          ],
        },
        {
          question: 'Describe a situation where you had to delegate tasks to team members.',
          tips: [
            'Explain your delegation strategy',
            'Discuss how you ensured accountability',
            'Share the results achieved',
          ],
        },
      ],
    },
    {
      category: 'Problem Solving',
      questions: [
        {
          question: 'Give me an example of a time when you solved a complex technical problem.',
          tips: [
            'Break down the problem-solving process',
            'Highlight analytical thinking',
            'Emphasize the impact of your solution',
          ],
        },
        {
          question: 'Tell me about a time when you had to make a decision with incomplete information.',
          tips: [
            'Explain your decision-making process',
            'Discuss risk assessment',
            'Share lessons learned',
          ],
        },
      ],
    },
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Behavioral Question Bank</h2>
      </div>

      <div className="space-y-4">
        {questions.map((category) => (
          <div key={category.category} className="border rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedCategory(
                selectedCategory === category.category ? null : category.category
              )}
            >
              <span className="font-medium">{category.category}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  selectedCategory === category.category ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {selectedCategory === category.category && (
              <div className="p-4 space-y-4">
                {category.questions.map((q, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="font-medium text-gray-900">{q.question}</p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Response Tips:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {q.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}