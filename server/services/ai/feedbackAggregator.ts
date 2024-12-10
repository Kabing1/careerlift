import { SpeechMetrics } from './types';

interface InterviewFeedback {
  verbal: {
    content: any;
    delivery: SpeechMetrics;
  };
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
  overall: {
    score: number;
    strengths: string[];
    improvements: string[];
  };
}

export function aggregateFeedback(
  speechMetrics: SpeechMetrics,
  contentAnalysis: any,
  technicalScore: number,
  nonVerbalMetrics: any
): InterviewFeedback {
  const feedback: InterviewFeedback = {
    verbal: {
      content: contentAnalysis,
      delivery: speechMetrics,
    },
    nonVerbal: nonVerbalMetrics,
    technical: {
      accuracy: technicalScore,
      depth: calculateTechnicalDepth(contentAnalysis),
      problemSolving: calculateProblemSolving(contentAnalysis),
    },
    overall: {
      score: 0,
      strengths: [],
      improvements: [],
    },
  };

  // Calculate overall score
  feedback.overall = calculateOverallScore(feedback);

  return feedback;
}

function calculateTechnicalDepth(contentAnalysis: any): number {
  // Implementation for technical depth calculation
  return 0;
}

function calculateProblemSolving(contentAnalysis: any): number {
  // Implementation for problem-solving score calculation
  return 0;
}

function calculateOverallScore(feedback: InterviewFeedback) {
  // Weights for different components
  const weights = {
    verbal: 0.4,
    nonVerbal: 0.2,
    technical: 0.4,
  };

  // Calculate weighted average
  const score = 
    weights.verbal * (feedback.verbal.delivery.confidence + feedback.verbal.delivery.clarity) / 2 +
    weights.nonVerbal * (feedback.nonVerbal.eyeContact + feedback.nonVerbal.posture) / 2 +
    weights.technical * (feedback.technical.accuracy + feedback.technical.problemSolving) / 2;

  // Identify strengths and areas for improvement
  const strengths = [];
  const improvements = [];

  // Add relevant strengths and improvements based on scores
  if (feedback.verbal.delivery.clarity > 80) strengths.push("Excellent communication clarity");
  if (feedback.verbal.delivery.clarity < 60) improvements.push("Work on speech clarity and articulation");

  return {
    score: Math.round(score),
    strengths,
    improvements,
  };
}