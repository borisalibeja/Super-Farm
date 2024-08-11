import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { FarmDataService } from './farm.service';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';
import { AppACGuard } from 'src/auth/guards';
import { GetFarmByNameDto } from './farm-dto/query-farm.dto';
import { CreateFarmDto } from './farm-dto/create-farm.dto';
import { UpdateFarmDto } from './farm-dto/update-farm.dto';

@UseGuards(AppACGuard)
@Controller('farm')
export class FarmDataController {
  constructor(private farmDataService: FarmDataService) {}

  @UseRoles({
    resource: 'farmData',
    action: 'read',
    possession: 'any',
  })
  @Get('all')
  getAllFarm() {
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
  getFarmByName(@Query() getFarmByNameDto: GetFarmByNameDto) {
    // Using GetFarmByNameDto
    return this.farmDataService.getFarmByName(getFarmByNameDto.farmName);
  }

  @UseRoles({
    resource: 'farmData',
    action: 'create',
    possession: 'any',
  })
  @Post('create')
  createFarm(
    @Body() createFarmDto: CreateFarmDto, // Using CreateFarmDto
    @Session() session: updatedSessionData,
  ) {
    const userId = session.user.userId;
    return this.farmDataService.createFarm(userId, createFarmDto.farmName);
  }

  @UseRoles({
    resource: 'farmData',
    action: 'update',
    possession: 'any',
  })
  @Patch('update/:id')
  async updateFarmById(
    @Param('id') farmId: string,
    @Body() updateFarmDto: UpdateFarmDto, // Using UpdateFarmDto
  ) {
    const { firstName, lastName, contactInfo, username, password } =
      updateFarmDto;
    return this.farmDataService.updateFarmById(
      farmId,
      firstName,
      lastName,
      contactInfo,
      username,
      password,
    );
  }

  @UseRoles({
    resource: 'farmData',
    action: 'delete',
    possession: 'own',
  })
  @Delete('delete/:farmId?')
  deleteFarm(
    @Session() session: updatedSessionData,
    @Param('farmId') farmId?: string,
  ) {
    const userId = session.user.userId;
    return this.farmDataService.deleteFarm(userId, farmId);
  }
}
