import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { AccountStatus, Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { VerificationService } from '../verification/verification.service';
import { KvStoreService } from '../kv-store/kv-store.service';
import { JwtHelperService } from '../jwt-helper/jwt-helper.service';
import {
  AccessJwtConfig,
  RefreshJwtConfig,
} from '../../configuration/jwt.config';
import { AUTH_BAD_REQUEST, AUTH_NOT_FOUND } from './constants/auth.constants';
import { CreateUserDto } from './dto/create-person.dto';
import { hashPassword } from 'src/common/helpers/hash-password.helper';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    private jwtHelperService: JwtHelperService,
    private userService: UserService,
    private verificationService: VerificationService,
    private kvStoreService: KvStoreService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    this.logger.verbose(`start validate user. input data is: email: ${email} password: ${password}`)
    const user = await this.userService.findBy({ email });
    if (!user) {
      throw new NotFoundException(AUTH_NOT_FOUND.MISSING_USER);
    }

    const isCompare = await bcrypt.compare(password, user.hash);
    if (isCompare) {
      return user;
    }

    throw new BadRequestException(AUTH_BAD_REQUEST.WRONG_DATA);
  }

  async addFirstUser(data: Prisma.UserCreateInput, deviceType: string) {
    const user = await this.userService.findUsers();
    if (user.length === 0 || process.env.NODE_ENV === 'test') {
      const user = await this.userService.create({ ...data });
      const { id } = user;

      const sessionKey = this.kvStoreService.generateSessionKey(id, deviceType);

      await this.kvStoreService.createSession({ id: sessionKey });
      const tokens = await this.generateTokens(sessionKey, user.email);
      return { user, ...tokens };
    }

    throw new BadRequestException(AUTH_BAD_REQUEST.FIRST_USER);
  }

  async singUp(data: CreateUserDto, deviceType: string) {
    const hash = await hashPassword(data.password);
    const user = await this.userService.create({ email: data.email, hash });
    const { id } = user;

    const sessionKey = this.kvStoreService.generateSessionKey(id, deviceType);
    await this.kvStoreService.createSession({ id: sessionKey });
    await this.sendSignUpVerification(data, sessionKey);

    return user;
  }

  async signIn({ email, password }: CreateUserDto, deviceType: string) {
    const user = await this.validateUser(email, password);
    const sessionKey = this.kvStoreService.generateSessionKey(user.id, deviceType);
    await this.sendVerificationKey(email, sessionKey);

    return user;
  }

  async sendSignUpVerification(data: CreateUserDto, sessionKey: string) {
    const verifyCode = this.verificationService.generateVerificationCode();
    return await this.verificationService.sendSignUpVerificationCode(
      data,
      sessionKey,
      verifyCode,
    );
  }
  async sendVerificationKey(email: string, sessionKey: string) {
    const verifyCode = this.verificationService.generateVerificationCode();
    return await this.verificationService.sendVerificationCode(
      email,
      sessionKey,
      verifyCode,
    );
  }

  async verifyUser(verifyCode: string, sessionKey: string) {
    return await this.verificationService.validateVerifyCode(
      verifyCode,
      sessionKey,
    );
  }

  async verification(verifyCode: string, email: string, deviceType: string) {
    const { id } = await this.userService.findBy({ email });
    const session = this.kvStoreService.generateSessionKey(id, deviceType);
    await this.verifyUser(verifyCode, session);
    await this.kvStoreService.activeSession(session);
    const tokens = await this.generateTokens(session, email);

    return tokens;
  }

  async generateTokens(sessionKey: string, email: string) {
    const user = await this.userService.findBy({ email });

    if (!user) {
      throw new NotFoundException(AUTH_NOT_FOUND.MISSING_USER);
    }

    const jwtToken = await this.jwtHelperService.generateToken(
      user,
      sessionKey,
      AccessJwtConfig(),
    );
    const refreshToken = await this.jwtHelperService.generateToken(
      user,
      sessionKey,
      RefreshJwtConfig(),
    );

    return { jwtToken, refreshToken };
  }

  async activeUserStatus(email: string): Promise<User | null> {
    const { id } = await this.userService.findBy({ email });
    return await this.userService.updateProperty(id, {
      accountStatus: AccountStatus.ACTIVE,
    });
  }

  async resetPassword(id: number, newPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findById(id);

    await this.userService.updateProperty(id, {
      password: newPasswordDto.password,
    });

    const data = {
      email: user.email,
      password: newPasswordDto.password,
    };

    await this.verificationService.sendNewPassword(data);
  }

  async logout(sessionKey: string): Promise<void> {
    return await this.kvStoreService.blockSession(sessionKey);
  }
}
