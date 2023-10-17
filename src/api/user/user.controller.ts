import { UserProfileService } from '../user-profile/user-profile.service';
import {
  Post,
  Controller,
  Query,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UsersInterceptor } from './interceptors/users.interceptor';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessJwtAuthGuard } from '../jwt-helper/guards/access-jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
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
import { BaseUserInterceptor } from './interceptors/base-user.interceptor';
import { USER_NOT_FOUND } from './constants/user.constants';
import { RolesDecorator } from '../roles/roles.decorator';
import { Role } from '@prisma/client';
import { GetUserProfileByNameDto } from './dto/get-user-by-name.dto';
import {
  CreateUserCategoryDto,
  CreateUserPartnerCategoryDto,
} from './dto/create-user-category.dto';
import { GetUsersByCategoryOkResponse } from './dto/ok-response/get-users-by-category.dto';
import { GetUsersByPartnerCategoryOkResponse } from './dto/ok-response/get-users-by-partner-category.dto';
import { GetUsersByNameOkResponse } from './dto/ok-response/get-users-by-name.dto';
import { CreateEmployeeOkResponse } from './dto/ok-response/create-employee-category-ok-re.dto';
import { CreatePartnerOkResponse } from './dto/ok-response/create-partner-category-ok.dto';
import { CreateManagerOkResponse } from './dto/ok-response/create-manager-category-ok-re.dto';
import { GetUsersByInterceptor } from './interceptors/get-users-by.interceptor';

@ApiTags('user')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: UserBadRequestErrorResponse })
@ApiNotFoundResponse({ type: UserNotFoundErrorResponse })
@UseGuards(AccessJwtAuthGuard, RolesGuard)
@UseInterceptors(BaseInterceptor, BaseUserInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOkResponse({ type: GetUserOkResponse })
  @UseInterceptors(UserInterceptor)
  async getSelf(@UserParam() { id }: jwtType) {
    return await this.userService.findById(id);
  }

  @Patch()
  @ApiOkResponse({ type: UpdatedOkResponse })
  @UseInterceptors(UserInterceptor)
  async updateSelf(@UserParam() { id }: jwtType, @Body() body: UpdateUserDto) {
    return await this.userService.updateProperty(id, body);
  }

  @Delete()
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseInterceptors(UserInterceptor)
  async deleteSelf(@UserParam() { id }: jwtType) {
    return await this.userService.remove(id);
  }
}

@ApiTags('users')
@UseInterceptors(BaseInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Get()
  @UseInterceptors(UsersInterceptor, BaseUserInterceptor)
  @ApiOkResponse({ type: GetUsersOkResponse })
  async findUsers(@Query() { limit, offset }: QueryPaginationParam) {
    const users = await this.userService.findUsers(offset, limit);
    const totalCount = await this.userService.getTotalCount();
    const returnData: usersResponse = {
      users,
      totalCount,
      limit,
      offset,
    };

    return returnData;
  }

  @Get('count')
  @ApiOkResponse({ type: GetUsersCountOkResponse })
  @UseInterceptors(UsersCountInterceptor, BaseUserInterceptor)
  async usersCount() {
    return await this.userService.getTotalCount();
  }

  @Get(`user/byId/${ID_PARAM}`)
  @ApiOkResponse({ type: GetUserOkResponse })
  @UseInterceptors(UserInterceptor, BaseUserInterceptor)
  async findUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND.MISSING_USER);
    }

    return user;
  }

  @Get(`by/name`)
  @ApiOkResponse({ type: GetUsersByNameOkResponse })
  @UseInterceptors(GetUsersByInterceptor)
  async getUserByName(
    @Query() { limit, offset, name }: GetUserProfileByNameDto,
  ) {
    const users = await this.userService.getUsersByName(limit, offset, name);
    return {
      data: users,
      limit,
      offset,
    };
  }

  @Get(`by/category/partners`)
  @ApiOkResponse({ type: GetUsersByPartnerCategoryOkResponse })
  @UseInterceptors(UserInterceptor)
  async getUserByPartner(@Query() { limit, offset }: QueryPaginationParam) {
    const users = await this.userService.getUsersByPartnerProfile(
      limit,
      offset,
    );
    return {
      data: users,
      limit,
      offset,
    };
  }

  @Get(`by/category/managers`)
  @ApiOkResponse({ type: GetUsersByCategoryOkResponse })
  @UseInterceptors(UserInterceptor)
  async getUserByPracticeManager(
    @Query() { limit, offset }: QueryPaginationParam,
  ) {
    const users = await this.userService.getUsersByProjectManagerProfile(
      limit,
      offset,
    );
    return {
      data: users,
      limit,
      offset,
    };
  }

  @Get(`by/category/employees`)
  @ApiOkResponse({ type: GetUsersByCategoryOkResponse })
  async getUserByEmployees(@Query() { limit, offset }: QueryPaginationParam) {
    const users = await this.userService.getUsersByEmployeesProfile(
      limit,
      offset,
    );
    return {
      data: users,
      limit,
      offset,
    };
  }

  @Get(`user/byEmail/:email`)
  @ApiOkResponse({ type: GetUserOkResponse })
  @UseInterceptors(UserInterceptor, BaseUserInterceptor)
  async findUserBy(@Param('email') email: string) {
    const user = await this.userService.findBy({ email });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND.MISSING_USER);
    }

    return user;
  }

  @Get(`user/byId/${ID_PARAM}/fullData`)
  @ApiOkResponse({ type: GetUserOkResponse })
  @UseInterceptors(UserInterceptor, BaseUserInterceptor)
  async findUserWithFullData(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserWithFullData(id);
  }

  @Delete(`user/byId/${ID_PARAM}`)
  @ApiOkResponse({ type: DeletedOkResponse })
  @UseGuards(AccessJwtAuthGuard)
  @UseInterceptors(UserInterceptor, BaseUserInterceptor)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }

  @Patch(`user/byId/${ID_PARAM}`)
  @UseInterceptors(BaseUserInterceptor)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.updateProperty(id, data);
  }

  @Delete(`user/drop`)
  @ApiOkResponse({ type: DeletedOkResponse })
  @RolesDecorator(Role.ADMIN)
  @UseGuards(AccessJwtAuthGuard, RolesGuard)
  @UseInterceptors(UserInterceptor)
  async deleteUsers() {
    return await this.userService.removeMany();
  }

  @Post(`user/user-category/partner`)
  @ApiOkResponse({ type: CreatePartnerOkResponse })
  @UseInterceptors(BaseUserInterceptor)
  async createPartnerProfile(@Body() data: CreateUserPartnerCategoryDto) {
    return await this.userService.createPartnerProfile(data);
  }

  @Post(`user/user-category/manager`)
  @ApiOkResponse({ type: CreateManagerOkResponse })
  @UseInterceptors(BaseUserInterceptor)
  async createPracticeManagerProfile(@Body() data: CreateUserCategoryDto) {
    return await this.userService.createPracticeManagerProfile(data);
  }

  @Post(`user/user-category/employee`)
  @ApiOkResponse({ type: CreateEmployeeOkResponse })
  @UseInterceptors(BaseUserInterceptor)
  async createEmployeesProfile(@Body() data: CreateUserCategoryDto) {
    return await this.userService.createEmployeesProfile(data);
  }
}
