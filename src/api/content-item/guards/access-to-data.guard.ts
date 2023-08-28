
import {ForbiddenException} from '@nestjs/common'
import { PrismaService } from './../../database/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ContentItemAccessToDataGuard implements CanActivate {
    constructor(
        private prismaService: PrismaService

    ) { }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean>{

        const httpRequest = context.switchToHttp().getRequest();
        const {id} = httpRequest.params
        const userId = httpRequest.user?.id;
        const isUserAssociated = await this.prismaService.contentItem.findFirst({
            where: {
                id,
                User: { some: { id: userId } }
            }
        });

        if(isUserAssociated){
            return true
        }else{
            throw new ForbiddenException("you do not have access to this data")
        }
    }
}