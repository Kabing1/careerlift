import { OpenAIApi } from 'openai';
import { z } from 'zod';

const openai = new OpenAIApi();

const CVSuggestionSchema = z.object({
  improvements: z.array(z.object({
    section: z.string(),
    suggestion: z.string(),
    reason: z.string(),
    examples: z.array(z.string()),
  })),
  keywords: z.array(z.string()),
  overallScore: z.number().min(0).max(100),
});

export type CVSuggestion = z.infer<typeof CVSuggestionSchema>;

export async function generateCVSuggestions(content: any): Promise<CVSuggestion> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional CV reviewer. Analyze the CV and provide specific improvements.
        Format your response as a JSON object with the following structure:
        {
          "improvements": [
            {
              "section": "section name",
              "suggestion": "what to improve",
              "reason": "why this improvement matters",
              "examples": ["example 1", "example 2"]
            }
          ],
          "keywords": ["relevant", "keywords", "for", "the", "industry"],
          "overallScore": 85
        }`
      },
      {
        role: "user",
        content: JSON.stringify(content)
      }
    ],
    response_format: { type: "json_object" }
  });

  const suggestions = JSON.parse(completion.choices[0].message.content);
  return CVSuggestionSchema.parse(suggestions);
}

export async function generateInterviewFeedback(transcript: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an expert interviewer. Analyze the candidate's response for:
        1. Content relevance
        2. Structure and clarity
        3. Specific examples provided
        4. Areas for improvement
        Provide actionable feedback with examples.`
      },
      {
        role: "user",
        content: transcript
      }
    ]
  });

  return completion.choices[0].message;
}