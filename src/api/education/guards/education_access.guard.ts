
import {ForbiddenException} from '@nestjs/common'
import { PrismaService } from './../../database/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BAD_REQUEST_ERRORS } from 'src/common/constants/app.constants';

@Injectable()
export class EducationAccessToDataGuard implements CanActivate {
    constructor(
        private prismaService: PrismaService

    ) { }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean>{
        const httpRequest = context.switchToHttp().getRequest();
        const {id} = httpRequest.params
        const userId = parseInt(httpRequest.user?.id);
        console.log(id, userId)
        const isUserAssociated = await this.prismaService.education.findFirst({
            where: {
                id: parseInt(id),
                userId
            }
        });

        if(isUserAssociated){
            return true
        }else{
            throw new ForbiddenException(BAD_REQUEST_ERRORS.FORBIDDEN)
        }
    }
}