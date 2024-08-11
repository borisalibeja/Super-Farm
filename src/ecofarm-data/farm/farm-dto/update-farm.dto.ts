import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFarmDto {
  @ApiPropertyOptional({
    description: 'First name of the farm owner',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the farm owner',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Contact information of the farm',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsOptional()
  contactInfo?: string;

  @ApiPropertyOptional({
    description: 'Username for the farm owner',
    example: 'johndoe',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: 'Password for the farm owner',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}
