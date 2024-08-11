import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Session,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';
import { AuthService } from './auth.service';
import { Role } from './enums/roles';
import { AuthGuard } from '@nestjs/passport';
import { updatedRequest } from './interfaces/request-interface';
import { UserDto } from './auth-dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(
    @Body() createUserDto: UserDto,
    @Session() session: updatedSessionData,
  ) {
    const { username, password } = createUserDto;
    if (!username || !password) {
      throw new BadRequestException('Missing required fields');
    }

    const user = await this.authService.signUp(username, password);
    await this.authService.createSessionForUser(user, session);

    return { message: 'User created successfully', user: session.user };
  }

  @SetMetadata('isPublic', true)
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() loginUserDto: UserDto,
    @Req() req: updatedRequest,
    @Session() session: updatedSessionData,
  ) {
    await this.authService.createSessionForUser(req.user, session);
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
