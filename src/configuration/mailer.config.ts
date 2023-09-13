import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService()

export const mailerConfig = (): MailerOptions => {
  return {
    transport: {
      host: config.get("MH_SMTP_BIND_HOST"),
      port: config.get("MH_SMTP_BIND_PORT"),
      ignoreTLS: true,
      secure: false,
    },
    defaults: {
      from: 'somevariable787898@gmail.com'
    }
  }; 
} 

export const generateSendObject = (email: string, verificationCode: string) => {
  const subject = 'Email Verification';
  const text = `Your verification code is: ${verificationCode}`;

  return {
    to: email,
    text,
    subject,
    from: "somevariable787898@gmail.com"
  }
}