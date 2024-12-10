import Redis from 'ioredis';
import { CacheKey } from './types';

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

export async function cacheGet<T>(key: CacheKey): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function cacheSet<T>(
  key: CacheKey,
  value: T,
  ttlSeconds?: number
): Promise<void> {
  const serialized = JSON.stringify(value);
  if (ttlSeconds) {
    await redis.setex(key, ttlSeconds, serialized);
  } else {
    await redis.set(key, serialized);
  }
}

export async function cacheDelete(key: CacheKey): Promise<void> {
  await redis.del(key);
}

export async function cacheFlush(): Promise<void> {
  await redis.flushall();
}

export default redis;