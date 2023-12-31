import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '../user/user.service';
import { KvStoreService } from '../kv-store/kv-store.service';
import {
  VERIFICATION_BAD_REQUEST_ERRORS,
  VERIFICATION_SERVER_ERRORS,
  VERIFY_KEY_TIMESTAMP,
} from './constants/constants';
import { SetVerificationProps } from '../kv-store/kv-types/kv-store.type';
import {
  generateRestPasswordSendObject,
  generateSignUpVerifySendObject,
  generateVerifySendObject,
} from '../../configuration/mailer.config';
import { CreateUserDto } from '../auth/dto/create-person.dto';

@Injectable()
export class VerificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly kvStoreService: KvStoreService,
  ) {}

  async sendVerificationCode(
    email: string,
    sessionKey: string,
    verificationKey: string,
  ) {
    try {
      const data: SetVerificationProps = {
        verificationKey,
        verificationTimestamp: Date.now().toString(),
      };

      await this.kvStoreService.setVerificationProps(sessionKey, data);
      const ans = await this.mailerService.sendMail(
        generateVerifySendObject(email, verificationKey),
      );
      const { accepted, rejected, messageId } = ans;
      return { accepted, rejected, messageId };
    } catch (error) {
      throw new InternalServerErrorException(VERIFICATION_SERVER_ERRORS.FAILED);
    }
  }

  async sendSignUpVerificationCode(
    userData: CreateUserDto,
    sessionKey: string,
    verificationKey: string,
  ) {
    try {
      const data: SetVerificationProps = {
        verificationKey,
        verificationTimestamp: Date.now().toString(),
      };

      await this.kvStoreService.setVerificationProps(sessionKey, data);
      const ans = await this.mailerService.sendMail(
        generateSignUpVerifySendObject(
          userData.email,
          userData,
          verificationKey,
        ),
      );
      const { accepted, rejected, messageId } = ans;
      return { accepted, rejected, messageId };
    } catch (error) {
      throw new InternalServerErrorException(VERIFICATION_SERVER_ERRORS.FAILED);
    }
  }

  async sendNewPassword({ email, password }: CreateUserDto) {
    try {
      const ans = await this.mailerService.sendMail(
        generateRestPasswordSendObject(email, password),
      );
      const { rejected } = ans;
      if (rejected.length > 0) {
        throw new Error();
      }
    } catch (error) {
      throw new InternalServerErrorException(VERIFICATION_SERVER_ERRORS.FAILED);
    }
  }

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async validateVerifyCode(
    verifyCode: string,
    sessionKey: string,
  ): Promise<boolean> {
    const session = await this.kvStoreService.getSession(sessionKey);

    if (
      parseInt(session.verificationTimestamp) + VERIFY_KEY_TIMESTAMP <
      Date.now()
    ) {
      throw new BadRequestException(VERIFICATION_BAD_REQUEST_ERRORS.OVERSTAYED);
    }

    if (session.verificationKey !== verifyCode) {
      throw new BadRequestException(VERIFICATION_BAD_REQUEST_ERRORS.WRONG_KEY);
    }

    return true;
  }
}
