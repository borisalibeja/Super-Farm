import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { FarmDataService } from './farm-data.service';

@Controller('farm-data')
export class FarmDataController {
    constructor(private farmDataService: FarmDataService) {}


    @UseRoles({
        resource: 'farmData',
        action: 'read',
        possession: 'any',
    })
    @Get('all')
    getAllFarm(){
        return this.farmDataService.getAllFarms();
    }


    @UseRoles({
        resource: 'farmData',
        action: 'read',
        possession: 'any',
    })
    @Get('id/:id')
    getFarmById(@Param('id') farmId: string) {
        return this.farmDataService.getFarmById(farmId);
    }
    

    @UseRoles({
        resource: 'farmData',
        action: 'read',
        possession: 'any',
    })
    @Get('name')
    getFarmByName(@Query('farmName') farmName: string){
        return this.farmDataService.getFarmByName(farmName);
    }
    
    
    @UseRoles({
        resource: 'farmData',
        action: 'update',
        possession: 'any',
    })
    @Patch('updateFarm/:id')
    async updateFarmById(
        @Param('id') farmId: string,
        @Body('firstName') firstName?: string,
        @Body('lastName') lastName?: string,
        @Body('contactInfo') contactInfo?: string,
        @Body('username') username?: string,
        @Body('password') password?: string,
    ) {
        return this.farmDataService.updateFarmById(farmId, firstName, lastName, contactInfo, username, password)
    }

    
    @UseRoles({
        resource: 'farmData',
        action: 'delete',
        possession: 'any',
    })
    @Delete('id/:id')
    deleteFarmById(@Param('id') farmId: string) {
        return this.farmDataService.deleteFarmById(farmId)
    }
}

