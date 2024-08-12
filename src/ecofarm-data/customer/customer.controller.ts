import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomerDataService } from './customer.service';
import { UseRoles } from 'nest-access-control';
import { AppACGuard, JwtAuthGuard } from 'src/auth/guards';
import { GetCustomerByNameDto } from './customer-dto/query-customer.dto';
import { UpdateCustomerDto } from './customer-dto/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@UseGuards(AppACGuard, JwtAuthGuard)
@Controller('customer')
export class CustomerDataController {
  constructor(private customerDataService: CustomerDataService) {}

  @UseRoles({
    resource: 'customerData',
    action: 'read',
    possession: 'any',
  })
  @Get('all')
  getAllCustomers() {
    return this.customerDataService.getAllCustomers();
  }

  @UseRoles({
    resource: 'customerData',
    action: 'read',
    possession: 'any',
  })
  @Get('name')
  getCustomerByName(@Query() getCustomerByNameDto: GetCustomerByNameDto) {
    return this.customerDataService.getCustomerByName(
      getCustomerByNameDto.firstName,
    );
  }

  @UseRoles({
    resource: 'customerData',
    action: 'read',
    possession: 'any',
  })
  @Get(':id')
  getCustomerById(@Param('id') customerId: string) {
    return this.customerDataService.getCustomerById(customerId);
  }

  @UseRoles({
    resource: 'customerData',
    action: 'update',
    possession: 'any',
  })
  @Patch('update/:id')
  async updateCustomerById(
    @Param('id') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const { firstName, lastName, contactInfo, username, password } =
      updateCustomerDto;
    return this.customerDataService.updateCustomerById(
      customerId,
      firstName,
      lastName,
      contactInfo,
      username,
      password,
    );
  }
}
