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
import { BaseInterceptor } from 'src/common/interceptors/data-to-json';
import { ID_PARAM } from 'src/common/constants/app.constants';
import { QueryPaginationParam } from 'src/common/dto/query-pagination.dto';

@ApiTags("user")
@ApiBearerAuth()
@RolesDecorator(Role.ADMIN)
@UseGuards(AccessJwtAuthGuard, RolesGuard)
@UseInterceptors(BaseInterceptor)
@Controller('user')
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

  @Patch() 
  async updateSelf(
    @UserParam() {id}: jwtType,
    @Body() body: UpdateUserDto
  ) {
    return await this.userService.updateProperty(id, body)
  }

  @Delete()
  async deleteSelf(
    @UserParam() {id}: jwtType,
  ) {
    return await this.userService.remove(id)
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

  @Get()
  async findUsers(
    @Query('limit, offset') {limit, offset}: QueryPaginationParam
    ) {
      return await this.userService.findUsers(offset, limit)
  }

  @Get('count')
  async usersCount() {
    return await this.userService.getTotalCount()
  }

  @Get(`user/${ID_PARAM}`)
  async findUser(@Param() id: number) {
    return await this.userService.findById(id)
  }

  @Delete(ID_PARAM)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id)
  }
}

