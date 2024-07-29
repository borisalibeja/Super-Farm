import { ConflictException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from './enums/roles';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    username: string, 
    password: string
    ) {
    const existingUser = await this.prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await argon.hash(password);
    return this.prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        role: Role.CUSTOMER
      },
    });
  }


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
