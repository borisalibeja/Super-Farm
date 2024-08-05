import { Module } from "@nestjs/common";
import { ProductDataController } from "./product/product.controller";
import { ProductDataService } from "./product/product.service";
import { CustomerDataController } from "./customer/customer.controller";
import { FarmDataController } from "./farm/farm.controller";
import { CustomerDataService } from "./customer/customer.service";
import { FarmDataService } from "./farm/farm.service";



@Module({
    controllers: [CustomerDataController,ProductDataController, FarmDataController],
    providers: [ProductDataService, CustomerDataService, FarmDataService]
  })
  export class EcoFarmDataModule {}