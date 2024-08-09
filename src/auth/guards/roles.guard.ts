import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACGuard, RolesBuilder } from 'nest-access-control';

@Injectable()
export class AppACGuard extends ACGuard implements CanActivate {
  constructor(
    reflector: Reflector, // Do not use protected or public here
    rolesBuilder: RolesBuilder,
  ) {
    super(reflector, rolesBuilder); // Pass dependencies to the parent class
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // You can add custom logic here before or after calling the parent method

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user has a role
    if (!user || !user.role) {
      throw new UnauthorizedException('User role is not defined');
    }

    // Convert the single role to an array if necessary for compatibility
    request.user.roles = [user.role];
    // Call the parent class's canActivate method
    const hasAccess = await super.canActivate(context);

    // Add any custom logic after the base class method is called
    if (!hasAccess) {
      console.log('Access denied for user:', user.username);
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return hasAccess;
  }
}
