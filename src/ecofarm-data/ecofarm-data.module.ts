import { Module } from "@nestjs/common";
import { ProductDataController } from "./product-data/product-data.controller";
import { ProductDataService } from "./product-data/product-data.service";
import { CustomerDataController } from "./customer-data/customer-data.controller";
import { FarmDataController } from "./farm-data/farm-data.controller";
import { CustomerDataService } from "./customer-data/customer-data.service";
import { FarmDataService } from "./farm-data/farm-data.service";



@Module({
    controllers: [CustomerDataController,ProductDataController, FarmDataController],
    providers: [ProductDataService, CustomerDataService, FarmDataService]
  })
  export class EcoFarmDataModule {}