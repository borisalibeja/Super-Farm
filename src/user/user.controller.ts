import { Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileDto } from './user-dto/user-profile.dto';
import { DeleteAccountResponseDto } from './user-dto/user-delete.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access_token')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@Req() req: any): Promise<UserProfileDto> {
    // Returning UserProfileDto
    const userId = req.user.userId;
    return this.userService.getMe(userId);
  }

  @Delete('delete')
  async deleteAccount(@Req() req: any): Promise<DeleteAccountResponseDto> {
    // Returning DeleteAccountResponseDto
    const userId = req.user.userId;
    await this.userService.deleteUserAccount(userId);
    return { message: 'Account deleted' };
  }
}
