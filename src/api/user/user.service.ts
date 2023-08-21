
import { Injectable} from '@nestjs/common';
import { Prisma, Role, User, UserTranslation } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LIMIT_USERS } from './constants/user.constants';




@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(data: Prisma.UserCreateInput): Promise<User> {

    const newUser = await this.prismaService.user.create({
          data
        })
    

    return newUser
  }


  async findUsers(skip?: number, take?: number): Promise<User[]> {
    const user: User[] = await this.prismaService.user.findMany({
      skip,
      take
    })
    return user
  }

  async getTotalCount(){
    return await this.prismaService.user.count()
  }

  async findBy(params: UpdateUserDto): Promise<User> {
    const user: User = await this.prismaService.user.findFirst({ where: params })

    return user
  }
  
  
  async findById(id: number): Promise<User> {
    const user: User = await this.prismaService.user.findFirst({ where: {id} })

    return user
  }

  async updateProperty(id: number, data: UpdateUserDto): Promise<User> {
    const updatedUser: User  = await this.prismaService.user.update({
        where: { id },
        data
      })

    return updatedUser

  }

  async remove(id: number): Promise<User> {
    const deletedUser: User = await this.prismaService.user.delete({
        where: { id }
      })

    return deletedUser
  }

}
