import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { AccountStatus, Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { VerificationService } from '../verification/verification.service';
import { KvStoreService } from '../kv-store/kv-store.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserProfileService } from 'src/api/user-profile/user-profile.service';
import { JwtHelperService } from '../jwt-helper/jwt-helper.service';
import { AccessJwtConfig, RefreshJwtConfig } from 'src/configuration/jwt.config';
import { AUTH_BAD_REQUEST, AUTH_NOT_FOUND, AUTH_OK } from './constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtHelperService: JwtHelperService,
    private userService: UserService,
    private verificationService: VerificationService,
    private kvStoreService: KvStoreService
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findBy({ email });

    if (!user) {
      throw new NotFoundException(AUTH_NOT_FOUND.MISSING_USER)
    }

    const isCompare = await bcrypt.compare(password, user.hash)

    if (isCompare) {
      return user
    }

    throw new BadRequestException(AUTH_BAD_REQUEST.WRONG_DATA);
  }

  async addFirstUser(data: Prisma.UserCreateInput,  deviceType: string) {
    const user = await this.userService.findUsers()

    if(user.length === 0) {
      const user =  await this.userService.create({...data})
      const { id } = user
    
      const sessionKey = this.kvStoreService.generateSessionKey(id, deviceType)
      
      await this.kvStoreService.createSession({id: sessionKey})
      const tokens = await this.generateTokens(sessionKey, user.email)
      return {user, ...tokens}
    }

    throw new BadRequestException(AUTH_BAD_REQUEST.FIRST_USER);

  }

  async singUp(data: Prisma.UserCreateInput,  deviceType: string) {
    const user =  await this.userService.create({...data})
    const {id, email} = user
    
    const sessionKey = this.kvStoreService.generateSessionKey(id, deviceType)

    await this.kvStoreService.createSession({id: sessionKey})
    await this.sendVerificationKey(email, sessionKey)

    return user
  }

  async signIn({ email, password }: { email: string, password: string }, deviceType: string) {
    const user = await this.validateUser(email, password)

    return user
  }

  async sendVerificationKey(email: string, sessionKey: string) {
    const verifyCode = this.verificationService.generateVerificationCode()
    return await this.verificationService.sendVerificationCode(email, sessionKey, verifyCode)
  } 

  async verifyUser(verifyCode: string, sessionKey: string){
    return await this.verificationService.validateVerifyCode(verifyCode, sessionKey);
  }

  async verification(verifyCode: string, email: string, deviceType: string) {
    const { id } = await this.userService.findBy({ email })
    const session = this.kvStoreService.generateSessionKey(id, deviceType)
    await this.verifyUser(verifyCode, session)
    await this.kvStoreService.activeSession(session)
    const tokens = await this.generateTokens(session, email)

    return tokens
  }

  async generateTokens (sessionKey: string, email: string) {
    const user = await this.userService.findBy({ email })

    if (!user) {
      throw new NotFoundException(AUTH_NOT_FOUND.MISSING_USER)
    }
    
    const jwtToken = await this.jwtHelperService.generateToken(user, sessionKey, AccessJwtConfig())
    const refreshToken = await this.jwtHelperService.generateToken(user, sessionKey, RefreshJwtConfig())

    return {jwtToken, refreshToken}
  }

  async activeUserStatus(email: string): Promise<User | null> {
    const { id } = await this.userService.findBy({ email })
    return await this.userService.updateProperty(id, { accountStatus: AccountStatus.ACTIVE });
  }

  async hashPassword(password) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error();
    }
  }

  async logout(sessionKey: string): Promise<void> {
    return await this.kvStoreService.blockSession(sessionKey)
  }
}
