import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL);

export const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 100, // Number of points
  duration: 60, // Per 60 seconds
});

export async function checkRateLimit(userId: string) {
  try {
    await rateLimiter.consume(userId);
    return true;
  } catch (error) {
    return false;
  }
}