import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username
      },
      select: {
        role: true,
        userId: true,
        username: true,
        password: true
      }
      
    });
    if (!user) return null;

    const pwValid = await argon.verify(user.password, password);
    if (!pwValid) return null;

    return user;
  }
}
