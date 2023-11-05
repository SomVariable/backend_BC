import { Module } from '@nestjs/common';
import { KvStoreService } from './kv-store.service';
import { KvStoreController } from './kv-store.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { RedisConfigService } from 'src/configuration/redis.config';

@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: RedisConfigService,
    }),
  ],
  controllers: [KvStoreController],
  providers: [KvStoreService],
  exports: [KvStoreService],
})
export class KvStoreModule {}
