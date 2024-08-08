import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Role } from '../enums/roles';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Credentials incorrect');
    }

    const userIsAdmin = user.role ;
    const userisFarmer = user.role;

    let userRole = Role.CUSTOMER;
    if (userisFarmer) userRole = Role.FARMER;
    if (userIsAdmin) userRole = Role.ADMIN;
  

    return {
      userId: user.userId,
      username: user.username,
      role: userRole,
    };
  }
}
