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
import { UseRoles } from 'nest-access-control';
import { ProductDataService } from './product.service';
import { updatedSessionData } from 'src/auth/interfaces/session-data-interface';
import { AppACGuard } from 'src/auth/guards';
import { GetProductByNameDto } from './product-dto/query-product.dto';
import { CreateProductDto } from './product-dto/create-product.dto';
import { UpdateProductDto } from './product-dto/update-product.dto';

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
  getProductByName(@Query() getProductByNameDto: GetProductByNameDto) {
    // Using GetProductByNameDto
    return this.productDataService.getProductByName(
      getProductByNameDto.productName,
    );
  }

  @UseRoles({
    resource: 'productData',
    action: 'create',
    possession: 'own',
  })
  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto, // Using CreateProductDto
    @Session() session: updatedSessionData,
  ) {
    const user = session.user;
    if (!user) {
      throw new UnauthorizedException('Farm not authenticated');
    }
    const farmId: string = user.userId;
    return this.productDataService.createProduct(
      createProductDto.productName,
      createProductDto.category,
      createProductDto.price,
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
    @Body() updateProductDto: UpdateProductDto, // Using UpdateProductDto
  ) {
    const { name, category, price } = updateProductDto;
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
