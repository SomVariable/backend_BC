import { Module } from '@nestjs/common';
import { S3Controller } from './s3-store.controller';
import { S3Service } from './s3-store.service';

@Module({
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service]
})
export class S3Module {}
