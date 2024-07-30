import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
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
    return this.userService.promoteCustomertoFarmer(session.user.userId, farmName);
  }

  
  @UseRoles({
    resource: 'farmData',
    action: 'update',
    possession: 'any',
  })
  @Post('demote/:userId')
  demoteFarmertoCustomer(@Param('userId') farmerId: string) {
    return this.userService.demoteFarmertoCustomer(farmerId)
  }
}
