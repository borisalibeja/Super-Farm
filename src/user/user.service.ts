import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  getMe(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        createdAt: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true
      },
    });
  }


  async promoteCustomertoFarmer(userId: string) {
    const departmentLink = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!departmentLink) throw new NotFoundException('Department not found');
    await this.prisma.user.update({
      where: {
        id: departmentLink.id,
      },
      data: {
        role: Role.FARMER,
      },
    });
  }

  async demoteManagerToUser(employeeId: string) {
    const departmentLink = await this.prisma.user.findFirst({
      where: {
        id: employeeId,
      },
    });
    if (!departmentLink) throw new NotFoundException('Department not found');
    await this.prisma.user.update({
      where: {
        id: departmentLink.id,
      },
      data: {
        role: Role.CUSTOMER,
      },
    });
  }
}
