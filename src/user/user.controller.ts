import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { UserService } from './user.service';
import { updatedSessionData } from 'src/interfaces/session-data-interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Session() session: updatedSessionData) {
    return this.userService.getMe(session.user.userId);
  }

  @UseRoles({
    resource: 'employeeData',
    action: 'update',
    possession: 'any',
  })
  @Post('promote')
  promoteUserToManager(@Body('employeeId') employeeId: string) {
    return this.userService.promoteUserToManager(employeeId);
  }

  @UseRoles({
    resource: 'employeeData',
    action: 'update',
    possession: 'any',
  })
  @Post('demote')
  demoteManagerToUser(@Body('employeeId') employeeId: string) {
    return this.userService.demoteManagerToUser(employeeId);
  }
}
