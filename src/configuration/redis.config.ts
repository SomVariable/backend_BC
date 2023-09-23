import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
const config = new ConfigService();

export const redisConfig = (): RedisClientOptions => {
  return {
    store: redisStore,
    isGlobal: true,

    host: config.get('REDIS_HOST'),
    port: config.get('REDIS_PORT'),
  };
};
