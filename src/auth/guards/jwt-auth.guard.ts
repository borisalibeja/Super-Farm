import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './meta-data';
import { ConfigService } from '@nestjs/config';
import { updatedRequest } from '../interfaces/request-interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService, // Using ConfigService instead of env
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<updatedRequest>(); // Ensuring proper typing
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'), // Using ConfigService
      });
      request['user'] = payload; // Attach payload to request object
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: updatedRequest): string | undefined {
    const authHeader = request.headers['authorization']; // Accessing the 'authorization' header
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' '); // Splitting the header value
    return type === 'Bearer' ? token : undefined;
  }
}
