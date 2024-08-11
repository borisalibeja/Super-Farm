import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiPropertyOptional({
    description: 'First name of the customer',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the customer',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Contact information of the customer',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsOptional()
  contactInfo?: string;

  @ApiPropertyOptional({
    description: 'Username of the customer',
    example: 'johndoe',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    description: 'Password of the customer',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
}
