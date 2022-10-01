import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
dotenv.config();

const REDIS_TTL = 60 * 60 * 24 * 7; // 7 days

export const REDIS_CONFIG = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

export const REDIS_CACHE_OPTIONS = {
  ...REDIS_CONFIG,
  store: redisStore,
  max: 100,
  isGlobal: true,
  ttl: REDIS_TTL,
};
