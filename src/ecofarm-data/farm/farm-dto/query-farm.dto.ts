import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFarmByNameDto {
  @ApiProperty({ description: 'Name of the farm', example: 'Sunnydale Farm' })
  @IsString()
  farmName!: string;
}
