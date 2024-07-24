import { Body, Controller, Get, Post, Session } from '@nestjs/common';
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
    resource: 'userData',
    action: 'update',
    possession: 'any',
  })
  @Post('/promote')
  promoteCustomertoFarmer(@Body('customerId') customerId: string) {
    return this.userService.promoteCustomertoFarmer(customerId);
  }

  @UseRoles({
    resource: 'userData',
    action: 'update',
    possession: 'any',
  })
  @Post('/demote')
  demoteFarmertoCustomer(@Body('farmerId') farmerId: string) {
    return this.userService.demoteFarmertoCustomer(farmerId);
  }
}
