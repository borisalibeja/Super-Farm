import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductByNameDto {
  @ApiProperty({ description: 'Name of the product', example: 'Apple' })
  @IsString()
  productName!: string;
}
