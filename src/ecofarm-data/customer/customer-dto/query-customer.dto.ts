import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCustomerByNameDto {
  @ApiProperty({ description: 'First name of the customer', example: 'John' })
  @IsString()
  firstName!: string;
}
