import { Body, Controller, Delete, Get, Param, Post, Session } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { UserService } from './user.service';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Session() session: updatedSessionData) {
    return this.userService.getMe(session.user.userId);
  }

  @UseRoles({
    resource: 'customerData',
    action: 'update',
    possession: 'any',
  })
  @Post('/promote')
  promoteCustomertoFarmer(
    @Body('farmName') farmName: string,
    @Session() session: updatedSessionData
  ) {
    return this.userService.createFarmAccount(session.user.userId, farmName);
  }

  
  @UseRoles({
    resource: 'farmData',
    action: 'update',
    possession: 'any',
  })
  @Delete('deletefarm')
  demoteFarmertoCustomer(
    @Session() session: updatedSessionData
  ) {
    return this.userService.deleteFarmAccount(session.user.userId)
  }

  @Delete('deleteaccount')
  deleteAccount(
    @Session() session: updatedSessionData
  ) {
    return this.userService.deleteUserAccount(session.user.userId)
  }
}
