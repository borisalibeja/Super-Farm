import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileDto } from './user-dto/user-profile.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string): Promise<UserProfileDto> {
    // Returning UserProfileDto
    const user = await this.prisma.user.findFirst({
      where: {
        userId: userId,
      },
      select: {
        userId: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteUserAccount(userId: string): Promise<void> {
    // No return value necessary
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    if (user?.role == Role.FARMER)
      throw new BadRequestException(
        'You should delete your Farm Account first',
      );
    await this.prisma.user.delete({
      where: { userId: userId },
    });
  }
}
