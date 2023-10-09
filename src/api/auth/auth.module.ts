import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

import { UserModule } from '../user/user.module';
import { VerificationModule } from '../verification/verification.module';
import { KvStoreModule } from '../kv-store/kv-store.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { JwtHelperModule } from '../jwt-helper/jwt-helper.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtHelperModule,
    VerificationModule,
    KvStoreModule,
    UserProfileModule,
    
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
