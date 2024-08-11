import { Controller, Delete, Get, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';
import { UserProfileDto } from './user-dto/user-profile.dto';
import { DeleteAccountResponseDto } from './user-dto/user-delete.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@Session() session: updatedSessionData): Promise<UserProfileDto> {
    // Returning UserProfileDto
    return this.userService.getMe(session.user.userId);
  }

  @Delete('delete')
  async deleteAccount(
    @Session() session: updatedSessionData,
  ): Promise<DeleteAccountResponseDto> {
    // Returning DeleteAccountResponseDto
    await this.userService.deleteUserAccount(session.user.userId);
    return { message: 'Account deleted' };
  }
}
