import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getMe(userId: string) {
    return this.prisma.user.findFirst({
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
  }

  async deleteUserAccount(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });
    if (user?.role == Role.FARMER)
      throw new BadRequestException('You should delete you Farm Account first');
    await this.prisma.user.delete({
      where: { userId: userId },
    });
    return 'Account deleted';
  }
}
