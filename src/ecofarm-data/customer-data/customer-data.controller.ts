import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CustomerDataService } from './customer-data.service';
import { UseRoles } from 'nest-access-control';

@Controller('customer-data')
export class CustomerDataController {
    constructor(private customerDataService: CustomerDataService) {}


    @UseRoles({
        resource: 'customerData',
        action: 'read',
        possession: 'any',
    })
    @Get('all')
    getAllCustomers(){
        return this.customerDataService.getAllCustomers();
    }


    @UseRoles({
        resource: 'customerData',
        action: 'read',
        possession: 'any',
    })
    @Get('id/:id')
    getCustomerById(@Param('id') customerId: string) {
        return this.customerDataService.getCustomerById(customerId);
    }
    

    @UseRoles({
        resource: 'customerData',
        action: 'read',
        possession: 'any',
    })
    @Get('/name')
    getCustomerByName(@Query('firstName') firstName: string){
        return this.customerDataService.getCustomerByName(firstName);
    }
    
    
    @UseRoles({
        resource: 'customerData',
        action: 'update',
        possession: 'any',
    })
    @Patch('updateCustomer/:id')
    async updateCustomerById(
        @Param('id') customerId: string,
        @Body('firstName') firstName?: string,
        @Body('lastName') lastName?: string,
        @Body('contactInfo') contactInfo?: string,
        @Body('username') username?: string,
        @Body('password') password?: string,
    ) {
        return this.customerDataService.updateCustomerById(customerId, firstName, lastName, contactInfo, username, password)
    }

    
    @UseRoles({
        resource: 'customerData',
        action: 'delete',
        possession: 'any',
    })
    @Delete('id/:id')
    deleteCustomerById(@Param('id') customerId: string) {
        return this.customerDataService.deleteCustomerById(customerId)
    }
}

