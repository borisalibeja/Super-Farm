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
  @Post('/promote/:userId')
  promoteCustomertoFarmer(@Param('userId') userId:string, @Body('farmName') farmName: string) {
    return this.userService.promoteCustomertoFarmer(userId, farmName);
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
