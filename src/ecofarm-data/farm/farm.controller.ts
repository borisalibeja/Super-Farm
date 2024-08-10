import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { FarmDataService } from './farm.service';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';
import { Role } from 'src/auth/enums/roles';
// import { UseRoles } from 'src/auth/guards/use-roles.decorator';


@Controller('farm')
export class FarmDataController {
    constructor(private farmDataService: FarmDataService) {}


    // @UseRoles({
    //     resource: 'farmData',
    //     action: 'read',
    //     possession: 'any',
    // })
    @Get('all')
    getAllFarm(){
        return this.farmDataService.getAllFarms();
    }


    // @UseRoles({
    //     resource: 'farmData',
    //     action: 'read',
    //     possession: 'any',
    // })
    @Get('id/:id')
    getFarmById(@Param('id') farmId: string) {
        return this.farmDataService.getFarmById(farmId);
    }
    

    // @UseRoles({
    //     resource: 'farmData',
    //     action: 'read',
    //     possession: 'any',
    // })
    @Get('name')
    getFarmByName(@Query('farmName') farmName: string){
        return this.farmDataService.getFarmByName(farmName);
    }
    

    
    @UseRoles({
            resource: 'farmData',
            action: 'read',
            possession: 'any',
        })
    @Post('create')
    createFarm(
        @Body('farmName') farmName: string,
        @Session() session: updatedSessionData
    ) {
        const userId = session.user.userId
        return this.farmDataService.createFarm(userId, farmName);
    }

  
  
//   @UseRoles({
//       resource: 'farmData',
//       action: 'update',
//       possession: 'any',
//     })
    @Patch('update/:id')
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
    

    // @UseRoles({
    //   resource: 'farmData',
    //   action: 'delete',
    //   possession: 'own'
    // })
    @Delete('delete/:farmId?')
    deleteFarm(
        @Session() session: updatedSessionData,
        @Param('farmId') farmId?: string,
    ) {
        const userId = session.user.userId
      return this.farmDataService.deleteFarm(userId, farmId)
    }
}

