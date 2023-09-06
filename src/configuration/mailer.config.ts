import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import {HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { join } from 'path';

const config = new ConfigService()

export const mailerConfig: MailerOptions = {
    transport: {
        host: config.get("MH_SMTP_BIND_HOST"), 
        port: config.get("MH_SMTP_BIND_ADDR"),         
      },
      defaults: {
        from: 'somevariable787898@gmail.com'
      }
  };

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