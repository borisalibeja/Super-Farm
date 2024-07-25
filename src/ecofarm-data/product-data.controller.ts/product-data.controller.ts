import { Controller, Get } from '@nestjs/common';
import { ProductDataService } from './product-data.service';
import { UseRoles } from 'nest-access-control';

@Controller('product-data')
export class ProductDataController {
    constructor(private ecoFarmDataService: ProductDataService) {}


    

    @Get('all')
    getAllProducts() {
        return this.ecoFarmDataService.getAllProducts();
    }


}
