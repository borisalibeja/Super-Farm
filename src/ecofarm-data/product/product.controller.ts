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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ProductDataService } from './product.service';
import { UseRoles } from 'nest-access-control';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';
import { AppACGuard } from 'src/auth/guards';

@UseGuards(AppACGuard)
@Controller('product')
export class ProductDataController {
  constructor(private productDataService: ProductDataService) {}

  @UseRoles({
    resource: 'productData',
    action: 'read',
    possession: 'any',
  })
  @Get('all')
  getAllProducts() {
    return this.productDataService.getAllProducts();
  }

  @UseRoles({
    resource: 'productData',
    action: 'read',
    possession: 'any',
  })
  @Get(':id')
  getProductById(@Param('id') productId: string) {
    return this.productDataService.getProductById(productId);
  }

  @UseRoles({
    resource: 'productData',
    action: 'read',
    possession: 'any',
  })
  @Get('name')
  getProductByName(@Query('productName') productName: string) {
    return this.productDataService.getProductByName(productName);
  }

  @UseRoles({
    resource: 'productData',
    action: 'create',
    possession: 'own',
  })
  @Post('create')
  async createProduct(
    @Body('name') productName: string,
    @Body('category') category: string | any,
    @Body('price') price: string,
    @Session() session: updatedSessionData,
  ) {
    const user = session.user;
    if (!user) {
      throw new UnauthorizedException('Farm not authenticated');
    }
    const farmId: string = user.userId;
    return this.productDataService.createProduct(
      productName,
      category,
      price,
      farmId,
    );
  }

  @UseRoles({
    resource: 'productData',
    action: 'update',
    possession: 'any',
  })
  @Patch('update/:id')
  async updateProductById(
    @Param('id') productId: string,
    @Body('name') name?: string,
    @Body('category') category?: string,
    @Body('price') price?: string,
  ) {
    return this.productDataService.updateProductById(
      productId,
      name,
      category,
      price,
    );
  }

  @UseRoles({
    resource: 'productData',
    action: 'delete',
    possession: 'any',
  })
  @Delete('id/:id')
  deleteProductById(@Param('id') productId: string) {
    return this.productDataService.deleteProductById(productId);
  }
}
