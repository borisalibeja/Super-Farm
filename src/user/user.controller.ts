import { Controller, Delete, Get, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@Session() session: updatedSessionData) {
    return this.userService.getMe(session.user.userId);
  }

  @Delete('delete')
  deleteAccount(@Session() session: updatedSessionData) {
    return this.userService.deleteUserAccount(session.user.userId);
  }
}
