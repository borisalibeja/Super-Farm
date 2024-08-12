import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Extract the user ID and roles from the JWT payload
    const { sub: userId, username, roles } = payload;

    // Optionally, you can fetch the user from the database to validate their existence and status
    const user = await this.authService.validateUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return {
      userId: user.userId,
      username: user.username,
      roles: user.roles,
    };
  }
}
