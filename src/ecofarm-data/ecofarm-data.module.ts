import { Module } from "@nestjs/common";
import { ProductDataController } from "./product-data.controller.ts/product-data.controller";
import { ProductDataService } from "./product-data.controller.ts/product-data.service";
import { CustomerDataController } from "./customer-data.controller.ts/customer-data.controller";
import { FarmDataController } from "./farm-data.controller.ts/farm-data.controller";
import { CustomerDataService } from "./customer-data.controller.ts/customer-data.service";
import { FarmDataService } from "./farm-data.controller.ts/farm-data.service";



@Module({
    controllers: [CustomerDataController,ProductDataController, FarmDataController],
    providers: [ProductDataService, CustomerDataService, FarmDataService]
  })
  export class EcoFarmDataModule {}