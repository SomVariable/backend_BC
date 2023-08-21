import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtType } from 'src/api/jwt-helper/types/jwt-helper.types';
import { KvStoreService } from 'src/api/kv-store/kv-store.service';
import { BLOCKED_SESSION_MESSAGE, JWT_REFRESH } from '../constants/jwt-helper.constants';


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, JWT_REFRESH) {
  constructor(
    configService: ConfigService,
    private readonly KvStoreService: KvStoreService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_SECRET_KEY'),
    });
  }

  async validate(payload: jwtType) {
    const session = await this.KvStoreService.getSession({id: payload.sessionKey})

    if(session?.status === 'BLOCKED'){
      throw new BadRequestException(BLOCKED_SESSION_MESSAGE)
    }

    return payload;
  }
}