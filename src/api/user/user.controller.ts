import { UserProfileService } from '../user-profile/user-profile.service';
import { Controller, Query, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UseGuards, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { Role} from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {  UserInterceptor } from './interceptors/user.interceptor';
import { UsersInterceptor } from './interceptors/users.interceptor';
import { RolesDecorator } from '../roles/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtHelperService } from '../jwt-helper/jwt-helper.service';
import { LIMIT_USERS } from './constants/user.constants';
import { UserParam } from 'src/common/decorators/param-user.decorator';
import { jwtType } from '../jwt-helper/types/jwt-helper.types';

@ApiTags("user")
@ApiBearerAuth()
@Controller('user')
@RolesDecorator(Role.ADMIN)
@UseGuards(AccessJwtAuthGuard, RolesGuard)
@UseInterceptors(UserInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelperService: JwtHelperService
  ) { }

  @Get('')
  async getSelf(
    @UserParam() {id}: jwtType
    ) {
    return await this.userService.findById(id)      
  }

}

@ApiTags("users")
@UseInterceptors(UsersInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService
  ) { }

  @Get('')
  async findUsers(
    @Query('offset', ParseIntPipe) offset: number = 0,
    @Query('limit', ParseIntPipe) limit: number = LIMIT_USERS
    ) {
      return await this.userService.findUsers(offset, limit)
  }
}

