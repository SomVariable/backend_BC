import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import {
  ACCESS_JWT_STRATEGY,
  BLOCKED_SESSION_MESSAGE,
} from '../constants/jwt-helper.constants';
import { KvStoreService } from 'src/api/kv-store/kv-store.service';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(
  Strategy,
  ACCESS_JWT_STRATEGY,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly KvStoreService: KvStoreService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_SECRET_KEY'),
    });
  }

  async validate(payload: jwtType) {
    const session = await this.KvStoreService.getSession(payload.sessionKey);

    if (session?.status === 'BLOCKED') {
      throw new BadRequestException(BLOCKED_SESSION_MESSAGE);
    }

    return payload;
  }
}
