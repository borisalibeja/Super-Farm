import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {
  @ApiProperty({ description: 'Name of the farm', example: 'Sunnydale Farm' })
  @IsString()
  @IsNotEmpty()
  farmName!: string;
}
