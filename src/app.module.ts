import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserProfileModule } from './api/user-profile/user-profile.module';
import configuration from './configuration/configuration';
import { UserModule } from './api/user/user.module';
import { KvStoreModule } from './api/kv-store/kv-store.module';
import { JwtHelperModule } from './api/jwt-helper/jwt-helper.module';
import { DatabaseModule } from './api/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }), 
  AuthModule, 
  UserProfileModule,
  UserModule, 
  KvStoreModule, 
  JwtHelperModule,
  DatabaseModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
