import { Controller, Get, Post, Body, UseGuards, Patch, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyUser } from './dto/verify-person.dto';
import { DeviceType } from 'src/common/decorators/device-type.decorator';
import { authVerifyReturnType } from './types/auth.types';
import { KvStoreService } from '../kv-store/kv-store.service';
import { CreateUserDto } from './dto/create-person.dto';
import {
  AUTH_OK
} from './constants/auth.constants';
import { AuthSignUpInterceptor } from './interceptors/sign-up-user.interceptor';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';
import { LocalAuthGuard } from './guards/local.guard';
import { UserService } from '../user/user.service';
import { ResendVerifyKey } from './dto/resend-verify-key.dto';
import { RefreshJwtAuthGuard } from '../jwt-helper/guards/refresh-jwt.guard';
import { AuthBadRequestErrorResponse } from './dto/auth-bad-request-error.dto';
import { SignUpOkResponse } from './dto/ok-response/sign-up.dto';
import { SignINOkResponse } from './dto/ok-response/sign-in.dto';
import { LogoutOkResponse } from './dto/ok-response/logout.dto';
import { VerificationOkResponse } from './dto/ok-response/verification.dto';
import { ResendVerificationOkResponse } from './dto/ok-response/resend-verification.dto';
import { RefreshTokensOkResponse } from './dto/ok-response/refresh-tokens.dto';
import { UnauthorizedExceptionResponse } from 'src/common/dto/unauthorized-errors.dto';
import { AccountStatus, Role } from '@prisma/client';
import { FirstUserOkResponse } from './dto/ok-response/first-user.dto';
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthLogoutInterceptor } from './interceptors/logout.interceptor';
import { AuthUserInterceptor } from './interceptors/user.interceptor';
import { AuthRefreshTokenInterceptor } from './interceptors/refresh-tokens.dto';
import { AuthResendVerifyKeyTokenInterceptor } from './interceptors/resend-verify-key.interceptor';
import { AuthVerificationInterceptor } from './interceptors/verification.interceptor';

@ApiTags("auth")
@UseInterceptors( BaseInterceptor, AuthInterceptor)
@ApiBadRequestResponse({ type: AuthBadRequestErrorResponse })
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly kvStoreService: KvStoreService) { }

  @ApiOkResponse({ type: SignUpOkResponse })
  @UseInterceptors( AuthSignUpInterceptor, AuthUserInterceptor)
  @Post('sign-up')
  async signUp(
    @DeviceType() deviceType: string,
    @Body() data: CreateUserDto) {
    const hash = await this.authService.hashPassword(data.password)
    const user = await this.authService.singUp({ email: data.email, hash }, deviceType)

    return user 
  }

  @ApiOkResponse({ type: FirstUserOkResponse })
  @UseInterceptors(AuthUserInterceptor)
  @Post('first-user')
  async addFirstUser(
    @DeviceType() deviceType: string,
    @Body() data: CreateUserDto) {
    const hash = await this.authService.hashPassword(data.password)
    const admin = await this.authService.addFirstUser({
      email: data.email,
      hash,
      role: Role.ADMIN,
      accountStatus: AccountStatus.ACTIVE
    }, deviceType)

    return admin
  }

  @ApiOkResponse({ type: SignINOkResponse })
  @UseInterceptors(AuthUserInterceptor)
  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(@DeviceType() deviceType: string, @Body() { email, password }: SignInDto) {
    const user = await this.authService.signIn({ email, password }, deviceType)

    return user
  }

  @ApiOkResponse({ type: LogoutOkResponse })
  @UseInterceptors(AuthLogoutInterceptor)
  @Patch("logout")
  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  async logout(
    @UserParam() jwtBody: jwtType) {
    const blockedSession = await this.authService.logout(jwtBody.sessionKey)

    return blockedSession
  }

  @ApiOkResponse({ type: VerificationOkResponse })
  @UseInterceptors(AuthVerificationInterceptor)
  @Post('login/verification')
  async loginVerification(
    @Body() { email, verifyCode }: VerifyUser,
    @DeviceType() deviceType: string) {
    const tokens = await this.authService.verification(verifyCode, email, deviceType)
    
    return tokens
  }

  @ApiOkResponse({ type: VerificationOkResponse })
  @UseInterceptors(AuthVerificationInterceptor)
  @Post('sign-up/verification')
  async signUpVerification(
    @Body() { email, verifyCode }: VerifyUser,
    @DeviceType() deviceType: string) {
    const tokens = await this.authService.verification(verifyCode, email, deviceType)

    await this.authService.activeUserStatus(email)

    return tokens
  }

  @ApiOkResponse({ type: ResendVerificationOkResponse })
  @UseInterceptors(AuthResendVerifyKeyTokenInterceptor)
  @Post('resend-verify-key')
  async resendVerifyKey(
    @Body() { email }: ResendVerifyKey,
    @DeviceType() deviceType: string) {
    const { id } = await this.userService.findBy({ email })
    const sessionKey = this.kvStoreService.generateSessionKey(id, deviceType)
    
    return await this.authService.sendVerificationKey(email, sessionKey)
  }

  @ApiOkResponse({ type: RefreshTokensOkResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedExceptionResponse })
  @UseInterceptors(AuthRefreshTokenInterceptor)
  @ApiBearerAuth()
  @Get('refresh-token')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(
    @UserParam() { email, sessionKey }: jwtType
  ) {
    const tokens = await this.authService.generateTokens(sessionKey, email)

    return tokens
  }
}
