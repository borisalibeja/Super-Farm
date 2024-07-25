import { Controller, Get } from '@nestjs/common';
import { FarmDataService } from './farm-data.service';
import { UseRoles } from 'nest-access-control';

@Controller('farm-data')
export class FarmDataController {
    constructor(private FarmDataService: FarmDataService) {}


    @UseRoles({
        resource: 'farmData',
        action: 'read',
        possession: 'any',
    })
    @Get('all')
    getAllFarms(){
        return this.FarmDataService.getAllFarms();
    }
    
}
