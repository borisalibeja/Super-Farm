import { Controller, Get } from '@nestjs/common';
import { EcoFarmDataService } from './ecofarm-data.service';
import { UseRoles } from 'nest-access-control';

@Controller('ecofarm-data')
export class EcoFarmDataController {
    constructor(private ecoFarmDataService: EcoFarmDataService) {}


    @UseRoles({
        resource: 'customerData',
        action: 'read',
        possession: 'any',
    })
    @Get('customer-data/all')
    getAllCustomers(){
        return this.ecoFarmDataService.getAllCustomers();
    }
    

    @Get('product-data/all')
    getAllProducts() {
        return this.ecoFarmDataService.getAllProducts();
    }
}
