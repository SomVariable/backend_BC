import { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
const config = new ConfigService();

export const redisConfig = (): RedisClientOptions => {
  return {
    store: config.get('store'),
    isGlobal: true,
    host: config.get('REDIS_HOST'),
    port: config.get('REDIS_PORT'),
  };
};
