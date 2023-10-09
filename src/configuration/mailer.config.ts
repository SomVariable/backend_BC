import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/api/auth/dto/create-person.dto';
import { SING_UP_VERIFY_MESSAGE, VERIFY_MESSAGE } from 'src/common/constants/app.constants';

const config = new ConfigService();

export const mailerConfig = (): MailerOptions => {
  return {
    transport: {
      host: config.get('MH_SMTP_BIND_HOST'),
      port: config.get('MH_SMTP_BIND_PORT'),
      ignoreTLS: true,
      secure: false,
    },
    defaults: {
      from: 'somevariable787898@gmail.com',
    },
  };
};

export const generateVerifySendObject = (email: string, verificationCode: string) => {
  const subject = 'Email Verification';
  const text = `${VERIFY_MESSAGE} ${verificationCode}`;

  return {
    to: email,
    text,
    subject,
    from: 'somevariable787898@gmail.com',
  };
};

export const generateSignUpVerifySendObject = (email: string, data: CreateUserDto, verificationCode: string) => {
  const subject = 'Email Verification';
  const text = SING_UP_VERIFY_MESSAGE(data, verificationCode);

  return {
    to: email,
    text,
    subject,
    from: 'somevariable787898@gmail.com',
  };
};


export const generateRestPasswordSendObject = (email: string, password: string) => {
  const subject = 'Email Verification';
  const text = `Password was changed. Your new password is; ${password}`;

  return {
    to: email,
    text,
    subject,
    from: 'somevariable787898@gmail.com',
  };
};

