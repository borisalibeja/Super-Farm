import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/enums';
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
        fullName: true,
        departmentsLink: {
          include: {
            department: true,
          },
        },
      },
    });
  }

  async promoteUserToManager(employeeId: string) {
    const departmentLink = await this.prisma.userDepartmentLink.findFirst({
      where: {
        userId: employeeId,
      },
    });
    if (!departmentLink) throw new NotFoundException('Department not found');
    await this.prisma.userDepartmentLink.update({
      where: {
        id: departmentLink.id,
      },
      data: {
        role: Role.MANAGER,
      },
    });
  }

  async demoteManagerToUser(employeeId: string) {
    const departmentLink = await this.prisma.userDepartmentLink.findFirst({
      where: {
        userId: employeeId,
      },
    });
    if (!departmentLink) throw new NotFoundException('Department not found');
    await this.prisma.userDepartmentLink.update({
      where: {
        id: departmentLink.id,
      },
      data: {
        role: Role.USER,
      },
    });
  }
}
