import { Module } from '@nestjs/common';
import { KvStoreService } from './kv-store.service';
import { KvStoreController } from './kv-store.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisConfig } from 'src/configuration/redis.config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClient } from 'redis';

const store: RedisClient = redisStore.create()

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>(redisConfig( store )),
  ],
  controllers: [KvStoreController],
  providers: [KvStoreService, {
    provide: 'REDIS_STORE',
    useValue: store, 
  },],
  exports: [KvStoreService],
})
export class KvStoreModule {}

