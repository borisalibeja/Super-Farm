import { ApiProperty } from '@nestjs/swagger';

export class DeleteAccountResponseDto {
  @ApiProperty({
    example: 'Account deleted',
    description: 'Confirmation message',
  })
  message?: string;
}
