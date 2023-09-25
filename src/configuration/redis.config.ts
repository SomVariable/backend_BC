import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
const config = new ConfigService();

export const redisConfig = (store: any): RedisClientOptions => {
  
  return {
    store,
    isGlobal: true,
    host: config.get('REDIS_HOST'),
    port: config.get('REDIS_PORT'),
  };
};