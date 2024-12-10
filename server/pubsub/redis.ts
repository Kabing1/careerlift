import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy: (times: number) => {
    // Exponential backoff
    return Math.min(times * 50, 2000);
  },
};

export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

export const EVENTS = {
  INTERVIEW_STARTED: 'INTERVIEW_STARTED',
  INTERVIEW_FEEDBACK: 'INTERVIEW_FEEDBACK',
  CV_UPDATED: 'CV_UPDATED',
};