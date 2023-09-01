import { Controller, Get, Post, Body, UseGuards,  Patch, UseInterceptors } from '@nestjs/common';
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
import { AuthUserInterceptor } from './interceptors/auth-user.interceptor';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';
import { LocalAuthGuard } from './guards/local.guard';
import { UserService } from '../user/user.service';
import { ResendVerifyKey } from './dto/resend-verify-key.dto';
import { RefreshJwtAuthGuard } from '../jwt-helper/guards/refresh-jwt.guard';
import { AuthErrorResponse } from './dto/auth-error.dto';
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

@ApiTags("auth")
@UseInterceptors(BaseInterceptor)
@ApiBadRequestResponse( {type: AuthErrorResponse} )
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly kvStoreService: KvStoreService) { }

  @ApiOkResponse( {type: SignUpOkResponse} )
  @UseInterceptors(AuthUserInterceptor)
  @Post('sign-up')
  async signUp(
    @DeviceType() deviceType: string,
    @Body() data: CreateUserDto) {
    const user = await this.authService.singUp({ email: data.email, hash: data.password }, deviceType)

    return {message: AUTH_OK.SIGN_UP, user}
  }


  @ApiOkResponse( {type: FirstUserOkResponse} )
  @UseInterceptors(AuthUserInterceptor)
  @Post('first-user')
  async addFirstUser(
    @DeviceType() deviceType: string,
    @Body() data: CreateUserDto) {
    const return_data = await this.authService.addFirstUser({ 
      email: data.email, 
      hash: data.password, 
      role: Role.ADMIN, 
      accountStatus: AccountStatus.ACTIVE 
    }, deviceType)

    return {message: AUTH_OK.FIRST_USER, ...return_data}
  }

  @ApiOkResponse( { type: SignINOkResponse } )
  @UseInterceptors(AuthUserInterceptor)
  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  async signIn(@DeviceType() deviceType: string, @Body() { email, password }: SignInDto) {
    const user = await this.authService.signIn({email, password}, deviceType) 

    return {message: AUTH_OK.SIGN_IN, user}
  }

  @ApiOkResponse( { type: LogoutOkResponse } )
  @Patch("logout")
  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  async logout(
    @UserParam() jwtBody: jwtType) {
    await this.authService.logout(jwtBody.sessionKey)

    return {message: AUTH_OK.LOGOUT}
  }

  @ApiOkResponse( { type: VerificationOkResponse } )
  @Post('login/verification')
  async loginVerification(
    @Body() { email, verifyCode }: VerifyUser,
    @DeviceType() deviceType: string) {
    const tokens = await this.authService.verification(verifyCode, email, deviceType)

    const res: authVerifyReturnType = {
      message: AUTH_OK.SUCCESS_VERIFICATION,
      ...tokens
    }
    return res
  }

  @ApiOkResponse( { type: VerificationOkResponse } )
  @Post('sign-up/verification')
  async signUpVerification(
    @Body() { email, verifyCode }: VerifyUser,
    @DeviceType() deviceType: string) {
    const tokens = await this.authService.verification(verifyCode, email, deviceType)

    await this.authService.activeUserStatus(email)

    const res: authVerifyReturnType = {
      message: AUTH_OK.SUCCESS_VERIFICATION,
      ...tokens
    }
    return res
  }

  @ApiOkResponse( { type: ResendVerificationOkResponse } )
  @Post('resend-verify-key')
  async resendVerifyKey(
    @Body() { email }: ResendVerifyKey,
    @DeviceType() deviceType: string) {
    const { id } = await this.userService.findBy({ email })
    const sessionKey = this.kvStoreService.generateSessionKey(id.toString(), deviceType)
    return await this.authService.sendVerificationKey(email, sessionKey)
  }

  @ApiOkResponse( { type: RefreshTokensOkResponse } )
  @ApiUnauthorizedResponse( {type: UnauthorizedExceptionResponse} )
  @ApiBearerAuth()
  @Get('refresh-token')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(
    @UserParam() { email, sessionKey }: jwtType
  ) {

    const tokens = await this.authService.generateTokens(sessionKey, email)

    const res: authVerifyReturnType = {
      message: AUTH_OK.REFRESH_TOKEN,
      ...tokens
    }
    return res
  }
}
