import { PrismaClient } from '@prisma/client';
import { OpenAIApi } from 'openai';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();
const openai = new OpenAIApi();

export const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.user.findUnique({ where: { id: user.id } });
    },
    
    cv: async (_, { id }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.cv.findFirst({
        where: { id, userId: user.id },
      });
    },
    
    interview: async (_, { id }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.interview.findFirst({
        where: { id, userId: user.id },
      });
    },
    
    myInterviews: async (_, __, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.interview.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
      });
    },
    
    myCVs: async (_, __, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.cv.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
      });
    },
  },

  Mutation: {
    createCV: async (_, { input }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.cv.create({
        data: {
          ...input,
          userId: user.id,
        },
      });
    },

    updateCV: async (_, { id, input }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.cv.update({
        where: { id },
        data: input,
      });
    },

    deleteCV: async (_, { id }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      await prisma.cv.delete({ where: { id } });
      return true;
    },

    startInterview: async (_, { input }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.interview.create({
        data: {
          ...input,
          userId: user.id,
          feedback: {},
          score: 0,
        },
      });
    },

    submitInterview: async (_, { id, feedback }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      return prisma.interview.update({
        where: { id },
        data: {
          feedback,
          score: calculateInterviewScore(feedback),
        },
      });
    },

    generateAISuggestions: async (_, { cvId }, { user }) => {
      if (!user) throw new GraphQLError('Not authenticated');
      
      const cv = await prisma.cv.findUnique({ where: { id: cvId } });
      if (!cv) throw new GraphQLError('CV not found');

      const suggestions = await generateCVSuggestions(cv.content);
      
      return prisma.cv.update({
        where: { id: cvId },
        data: { aiSuggestions: suggestions },
      });
    },
  },

  User: {
    cvs: (parent) => prisma.cv.findMany({ where: { userId: parent.id } }),
    interviews: (parent) => prisma.interview.findMany({ where: { userId: parent.id } }),
  },

  CV: {
    user: (parent) => prisma.user.findUnique({ where: { id: parent.userId } }),
  },

  Interview: {
    user: (parent) => prisma.user.findUnique({ where: { id: parent.userId } }),
  },
};

async function generateCVSuggestions(content: any) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a professional CV reviewer. Analyze the CV and provide specific improvements."
      },
      {
        role: "user",
        content: JSON.stringify(content)
      }
    ]
  });

  return completion.choices[0].message;
}

function calculateInterviewScore(feedback: any): number {
  // Implement scoring algorithm based on feedback metrics
  const metrics = {
    communication: 0.3,
    technicalAccuracy: 0.3,
    problemSolving: 0.2,
    behavioralResponses: 0.2,
  };

  let score = 0;
  for (const [key, weight] of Object.entries(metrics)) {
    if (feedback[key]) {
      score += (feedback[key] * weight);
    }
  }

  return Math.round(score * 100);
}