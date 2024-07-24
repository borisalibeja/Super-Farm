import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/roles';
import { updatedRequest } from 'src/auth/interfaces/request-interface';




@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { session } = context.switchToHttp().getRequest<updatedRequest>();

    return requiredRoles.some((role) => session.user.roles.includes(role));
  }
}
