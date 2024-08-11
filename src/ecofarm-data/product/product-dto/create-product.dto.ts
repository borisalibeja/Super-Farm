import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'Apple' })
  @IsString()
  @IsNotEmpty()
  productName!: string;

  @ApiProperty({ description: 'Category of the product', example: 'Fruit' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ description: 'Price of the product', example: '1.99' })
  @IsString()
  @IsNotEmpty()
  price!: string;
}
