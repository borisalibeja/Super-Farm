import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './auth-dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { updatedRequest } from './interfaces/request-interface';
import { JwtAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signUp(
    @Body() createUserDto: UserDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = createUserDto;

    if (!username || !password) {
      throw new BadRequestException('Missing required fields');
    }

    return this.authService.signUp(username, password);
  }

  @SetMetadata('isPublic', true)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() loginUserDto: UserDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = loginUserDto;
    return this.authService.signIn(username, password);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  logout(@Req() req: updatedRequest) {
    // Since we're using JWT, there is no server-side session to destroy
    return {
      status: 204,
      message: 'Logout successful',
    };
  }
}
