export type CacheKey = 
  | `user:${string}`
  | `cv:${string}`
  | `interview:${string}`
  | `suggestions:${string}`;

export interface CacheConfig {
  ttl: number;
  prefix: string;
}