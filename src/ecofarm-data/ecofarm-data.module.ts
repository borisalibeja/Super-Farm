import { Module } from '@nestjs/common';
import { EcoFarmDataController } from './ecofarm-data.controller';
import { EcoFarmDataService } from './ecofarm-data.service';

@Module({
  controllers: [EcoFarmDataController],
  providers: [EcoFarmDataService]
})
export class EcoFarmDataModule {}
