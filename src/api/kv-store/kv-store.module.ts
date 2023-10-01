import { Module } from '@nestjs/common';
import { KvStoreService } from './kv-store.service';
import { KvStoreController } from './kv-store.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisConfig } from 'src/configuration/redis.config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClient } from 'redis';

console.log('ON_MODULE_INIT')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')
console.log('------------------------------------------------------------------------------------------')


@Module({
  imports: [
    CacheModule.register<RedisClientOptions>(redisConfig( redisStore.create() )),
  ],
  controllers: [KvStoreController],
  providers: [KvStoreService],
  exports: [KvStoreService],
})
export class KvStoreModule {}

