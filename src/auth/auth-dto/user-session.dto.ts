import { Role } from '../enums/roles';
import { ApiProperty } from '@nestjs/swagger';

export class UserSessionDto {
  @ApiProperty({
    example: '60b8d6d8f8d9b823a8d0e1c8',
    description: 'The unique ID of the user',
  })
  userId!: string;

  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username!: string;

  @ApiProperty({
    example: ['CUSTOMER'],
    description: 'The roles assigned to the user',
  })
  role!: Role[];

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The contact information of the user',
  })
  contactInfo!: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'The hashed password of the user',
  })
  password!: string;
}
