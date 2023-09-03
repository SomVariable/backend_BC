
import { ForbiddenException } from '@nestjs/common'
import { PrismaService } from './../../database/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PIAccessToDataGuard implements CanActivate {
    constructor(
        private prismaService: PrismaService

    ) { }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {

        const httpRequest = context.switchToHttp().getRequest();
        const { id } = httpRequest.params
        const userId = parseInt(httpRequest.user?.id);
        const data = await this.prismaService.professionalInterest.findFirst({ where: { id } })

        if (userId === data.userId) {
            return true
        } else {
            throw new ForbiddenException("you do not have access to this data")
        }
    }
}