import * as redisStore from 'cache-manager-redis-store';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  store: process.env.NODE_ENV === 'test' ? redisStore.create() : redisStore,
  databaseUrl: process.env.DATABASE_URL,
});
