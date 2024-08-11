import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Name of the product', example: 'Apple' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Category of the product',
    example: 'Fruit',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Price of the product', example: '1.99' })
  @IsString()
  @IsOptional()
  price?: string;
}
