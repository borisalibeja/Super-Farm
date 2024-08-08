import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Session,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';
import { AuthService } from './auth.service';
import { Role } from './enums/roles';
import { AuthGuard } from '@nestjs/passport';
import { updatedRequest } from './interfaces/request-interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
    @Session() session: updatedSessionData
  ) {
    if (!username || !password) {
      throw new BadRequestException('Missing required fields');
    }

    const user = await this.authService.signUp(username, password);
    session.user = {
      userId: user.userId,
      username: user.username,
      role: [user.role as Role],
      firstName: user.firstName,
      contactInfo: user.contactInfo,
      lastName: user.lastName,
      password: user.password
    };

    return { message: 'User created successfully', user: session.user };
  }


  @SetMetadata('isPublic', true)
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(
    @Req() req: updatedRequest, 
    @Session() session: updatedSessionData) {
    session.user = {
      userId: req.user.userId,
      username: req.user.username,
      role: req.user.role,
      firstName: req.user.firstName,
      contactInfo: req.user.contactInfo,
      lastName: req.user.lastName,
      password: req.user.password
      
    };
    return {
      status: HttpStatus.OK,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  logout(@Req() req: updatedRequest) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        resolve({
          status: 204,
          message: 'Session destroyed',
        });
      });
    });
  }
}
