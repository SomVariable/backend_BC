import { UserProfileService } from '../user-profile/user-profile.service';
import { Controller, Query, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UseGuards, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserInterceptor } from './interceptors/user.interceptor';
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
import { UserBadRequestErrorResponse } from './dto/user-bad-request-error.dto';
import { UserNotFoundErrorResponse } from './dto/user-not-found-error.dto';
import { GetUserOkResponse } from './dto/ok-response/get-user.dto';
import { UpdatedOkResponse } from './dto/ok-response/updated.dto';
import { DeletedOkResponse } from './dto/ok-response/deleted.dto';
import { GetUsersOkResponse } from './dto/ok-response/get-users.dto';
import { UsersCountInterceptor } from './interceptors/count.interceptor';
import { GetUsersCountOkResponse } from './dto/ok-response/count.dto';
import { usersResponse } from './types/user.types';

@ApiTags("user")
@ApiBearerAuth()
@ApiBadRequestResponse({ type: UserBadRequestErrorResponse })
@ApiNotFoundResponse({ type: UserNotFoundErrorResponse })
@UseGuards(AccessJwtAuthGuard, RolesGuard)
@UseInterceptors(BaseInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get('')
  @ApiOkResponse({ type: GetUserOkResponse })
  @UseInterceptors(UserInterceptor)
  async getSelf(
    @UserParam() { id }: jwtType
  ) {
    return await this.userService.findById(id)
  }

  @Patch()
  @ApiOkResponse({ type: UpdatedOkResponse })
  @UseInterceptors(UserInterceptor)
  async updateSelf(
    @UserParam() { id }: jwtType,
    @Body() body: UpdateUserDto
  ) {
    return await this.userService.updateProperty(id, body)
  }

  @Delete()
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseInterceptors(UserInterceptor)
  async deleteSelf(
    @UserParam() { id }: jwtType,
  ) {
    return await this.userService.remove(id)
  }
}

@ApiTags("users")
@UseInterceptors(BaseInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService
  ) { }

  @Get()
  @UseInterceptors(UsersInterceptor)
  @ApiOkResponse({ type: GetUsersOkResponse })
  async findUsers(
    @Query() { limit, offset }: QueryPaginationParam
  ) {
    const users = await this.userService.findUsers(offset, limit)
    const totalCountUsers = await this.userService.getTotalCount()
    const returnData: usersResponse = {
      users,
      totalCountUsers,
      limit, 
      offset
    }
    return returnData
  }

  @Get('count')
  @ApiOkResponse({ type: GetUsersCountOkResponse })
  @UseInterceptors(UsersCountInterceptor)
  async usersCount() {
    return await this.userService.getTotalCount()
  }

  @Get(`user/${ID_PARAM}`)
  @ApiOkResponse({ type: GetUserOkResponse })
  @UseInterceptors(UserInterceptor)
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id)
  }

  @Get(`user/${ID_PARAM}/fullData`)
  @ApiOkResponse({ type: GetUserOkResponse })
  @UseInterceptors(UserInterceptor)
  async findUserWithFullData(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserWithFullData(id)
  }

  @Delete(ID_PARAM)
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseInterceptors(UserInterceptor)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id)
  }
}

