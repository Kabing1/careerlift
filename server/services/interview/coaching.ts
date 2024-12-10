import { OpenAIApi } from 'openai';
import { analyzeEmotions } from '../ai/emotionAnalysis';
import { SpeechMetrics } from '../ai/types';

const openai = new OpenAIApi();

interface CoachingFeedback {
  suggestions: string[];
  stressLevel: number;
  confidenceScore: number;
  nextQuestionDifficulty: 'easier' | 'same' | 'harder';
}

export async function generateRealtimeCoaching(
  speechMetrics: SpeechMetrics,
  transcript: string,
  emotionMetrics: any
): Promise<CoachingFeedback> {
  // Analyze stress levels
  const stressLevel = calculateStressLevel(speechMetrics, emotionMetrics);
  
  // Generate contextual coaching
  const coaching = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an expert interview coach. Based on the candidate's performance metrics:
        - Speech Metrics: ${JSON.stringify(speechMetrics)}
        - Emotion Metrics: ${JSON.stringify(emotionMetrics)}
        - Stress Level: ${stressLevel}
        
        Provide real-time coaching suggestions. Focus on immediate actionable feedback.`
      },
      {
        role: "user",
        content: transcript
      }
    ]
  });

  const suggestions = coaching.choices[0].message.content.split('\n');
  
  return {
    suggestions,
    stressLevel,
    confidenceScore: speechMetrics.confidence,
    nextQuestionDifficulty: determineNextQuestionDifficulty(
      speechMetrics,
      stressLevel
    ),
  };
}

function calculateStressLevel(
  speechMetrics: SpeechMetrics,
  emotionMetrics: any
): number {
  const weights = {
    speechPace: 0.3,
    fillerWords: 0.2,
    emotionalState: 0.5,
  };

  return (
    weights.speechPace * (speechMetrics.pace > 120 ? 1 : 0) +
    weights.fillerWords * (speechMetrics.fillerWords / 100) +
    weights.emotionalState * emotionMetrics.stress
  ) * 100;
}

function determineNextQuestionDifficulty(
  speechMetrics: SpeechMetrics,
  stressLevel: number
): 'easier' | 'same' | 'harder' {
  if (stressLevel > 70) return 'easier';
  if (speechMetrics.confidence > 80 && stressLevel < 30) return 'harder';
  return 'same';
}