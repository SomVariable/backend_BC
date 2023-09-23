import { ForbiddenException } from '@nestjs/common';
import { PrismaService } from './../../database/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { BAD_REQUEST_ERRORS } from 'src/common/constants/app.constants';

@Injectable()
export class AwardAccessToDataGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpRequest = context.switchToHttp().getRequest();
    const { id } = httpRequest.params;
    const userId = parseInt(httpRequest.user?.id);
    const data = await this.prismaService.award.findFirst({
      where: { id: parseInt(id) },
    });

    if (userId === data.userId) {
      return true;
    } else {
      throw new ForbiddenException(BAD_REQUEST_ERRORS.FORBIDDEN);
    }
  }
}
