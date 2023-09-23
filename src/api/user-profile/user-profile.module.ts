import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { DatabaseModule } from '../database/database.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [DatabaseModule, PhotoModule],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
