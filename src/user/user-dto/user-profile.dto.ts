import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/roles';

export class UserProfileDto {
  @ApiProperty({ example: '12345', description: 'The unique ID of the user' })
  userId!: string;

  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username!: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName!: string | null;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName!: string | null;

  @ApiProperty({ example: 'CUSTOMER', description: 'The role of the user' })
  role!: string;
}
