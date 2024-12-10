export interface SpeechMetrics {
  clarity: number;
  confidence: number;
  pace: number;
  fillerWords: number;
  volume: number;
}

export interface CVSuggestion {
  improvements: Array<{
    section: string;
    suggestion: string;
    reason: string;
    examples: string[];
  }>;
  keywords: string[];
  overallScore: number;
}

export interface InterviewMetrics {
  verbal: SpeechMetrics;
  nonVerbal: {
    eyeContact: number;
    gestures: number;
    posture: number;
  };
  technical: {
    accuracy: number;
    depth: number;
    problemSolving: number;
  };
}