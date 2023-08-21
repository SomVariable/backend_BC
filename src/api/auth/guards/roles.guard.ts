import { ROLES_KEY } from './../../roles/roles.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { AccessJwtConfig } from 'src/configuration/jwt.config';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
   
    if (!requiredRoles) {
      return true;
    }

    const httpRequest = context.switchToHttp().getRequest();
    const user = httpRequest.user;

    if (user && user?.id === -1) return null;

    return requiredRoles.some((r) => user?.role === r);
  }
}