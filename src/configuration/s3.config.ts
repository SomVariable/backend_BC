import { ConfigService } from "@nestjs/config";
import {S3ClientConfig} from '@aws-sdk/client-s3'

const configService = new ConfigService()


export const s3Config: S3ClientConfig = {
    credentials: {
      accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
    },
    ...(configService.get('S3_ENDPOINT')
      ? {
          endpoint: configService.get('S3_ENDPOINT'),
          forcePathStyle: true,
        }
      : {}),
    ...(configService.get('S3_REGION')
      ? {
          region: configService.get('S3_REGION'),
        }
      : {}),
  };