import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from './enums/roles';
import { updatedSessionData } from './interfaces/session-data-interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await argon.hash(password);
    const user = await this.prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        role: Role.CUSTOMER,
      },
    });
    const access_token = this.generateToken(user);

    return { access_token };
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user || !(await argon.verify(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const access_token = this.generateToken(user);

    // Exclude sensitive fields like password from the returned user object
    const { password: _, ...userWithoutPassword } = user;

    return {
      access_token,
      user: userWithoutPassword,
    };
  }

  private generateToken(user: any): string {
    const payload = {
      sub: user.userId,
      username: user.username,
      roles: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async validateUserById(userId: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        username: true,
        role: true, // Ensure this matches the property in your User model
      },
    });
  }

  async createSessionForUser(user: any, session: updatedSessionData) {
    session.user = {
      userId: user.userId,
      username: user.username,
      role: [user.role as Role],
      firstName: user.firstName,
      contactInfo: user.contactInfo,
      lastName: user.lastName,
      password: user.password,
    };
  }
}
