import { shield, rule, allow, deny } from 'graphql-shield';
import { Context } from '../types';

const isAuthenticated = rule()(async (_parent, _args, ctx: Context) => {
  return ctx.user !== null;
});

const isAdmin = rule()(async (_parent, _args, ctx: Context) => {
  return ctx.user?.role === 'ADMIN';
});

const isOwner = rule()(async (_parent, { id }, ctx: Context) => {
  const resource = await ctx.prisma.cv.findUnique({
    where: { id },
    select: { userId: true }
  });
  return resource?.userId === ctx.user?.id;
});

export const permissions = shield({
  Query: {
    me: isAuthenticated,
    cv: isAuthenticated,
    interview: isAuthenticated,
    myInterviews: isAuthenticated,
    myCVs: isAuthenticated,
  },
  Mutation: {
    createCV: isAuthenticated,
    updateCV: isOwner,
    deleteCV: isOwner,
    startInterview: isAuthenticated,
    submitInterview: isAuthenticated,
    generateAISuggestions: isAuthenticated,
  },
  Subscription: {
    interviewFeedback: isAuthenticated,
    cvUpdated: isAuthenticated,
  }
});