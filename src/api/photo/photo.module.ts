import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { DatabaseModule } from '../database/database.module';
import { S3Module } from '../s3-store/s3-store.module';

@Module({
  imports: [DatabaseModule, S3Module],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService]
})
export class PhotoModule {}
