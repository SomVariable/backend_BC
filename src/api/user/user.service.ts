import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  USER_NOT_FOUND,
  UserIncludeAvatar,
  UserIncludeAwards,
  UserIncludeEducation,
  UserIncludeTranslation,
} from './constants/user.constants';
import { hashPassword } from 'src/common/helpers/hash-password.helper';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const newUser = await this.prismaService.user.create({
      data,
    });

    return newUser;
  }

  async findUsers(skip?: number, take?: number) {
    const user = await this.prismaService.user.findMany({
      include: { UserTranslation: true },
      skip,
      take,
    });
    return user;
  }

  async getUserWithFullData(id: number) {
    const user = await this.prismaService.user.findUnique({
      include: {
        ...UserIncludeAvatar,
        ...UserIncludeAwards,
        ...UserIncludeEducation,
        ...UserIncludeTranslation,
      },
      where: { id },
    });

    return user;
  }

  async getTotalCount() {
    return await this.prismaService.user.count();
  }

  async findBy(params: UpdateUserDto) {
    const user = await this.prismaService.user.findFirst({
      include: { UserTranslation: true },
      where: params,
    });

    return user;
  }

  async findById(id: number) {
    const user: User = await this.prismaService.user.findFirst({
      include: { UserTranslation: true },
      where: { id },
    });

    return user;
  }

  async updateProperty(id: number, {
    accountStatus, email, 
    password, role 
  }: UpdateUserDto) {
    await this.findById(id);

    const updateData: Prisma.UserUpdateInput = {
      accountStatus, email, role
    }

    if(password){
      updateData['hash'] = await hashPassword(password);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateData
      },
    });

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND.MISSING_USER);
    }

    const deletedUser: User = await this.prismaService.user.delete({
      where: { id },
    });

    return deletedUser;
  }
}
