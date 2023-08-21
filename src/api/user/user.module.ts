import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, UsersController } from './user.controller';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { JwtHelperModule } from '../jwt-helper/jwt-helper.module';
import { DatabaseModule } from '../database/database.module';


@Module({
  imports: [ DatabaseModule, UserProfileModule, JwtHelperModule],
  controllers: [UserController, UsersController],
  providers: [UserService],
  exports: [UserService ]
})
export class UserModule {}
