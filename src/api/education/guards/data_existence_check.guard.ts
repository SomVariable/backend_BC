import { NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../database/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { EDUCATION_NOT_FOUND } from '../constants/education.constants';

@Injectable()
export class EducationExistenceGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpRequest = context.switchToHttp().getRequest();
    const { id } = httpRequest.params;

    const isEducationExist = await this.prismaService.education.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (isEducationExist) {
      return true;
    } else {
      throw new NotFoundException(EDUCATION_NOT_FOUND.MISSING_EDUCATION);
    }
  }
}
