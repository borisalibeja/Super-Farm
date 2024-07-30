import { tr } from '@faker-js/faker';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
        role: true
      },
    });
  }


  async promoteCustomertoFarmer(userId: string, farmName: string | 'UnKnown') {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: userId
      }
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.role !== Role.CUSTOMER) {
      throw new BadRequestException('User is not a customer');
    }
    await this.prisma.user.update({
      where: {userId: userId},
      data: {role: Role.FARMER}
    })
    const updatedCustomer = await this.prisma.farm.create({
      data: {
        farmName: farmName,
        userFarmId: userId
      },
      select: {
        farmName: true,
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true,
      }
    });
    return updatedCustomer;
  }


  async demoteFarmertoCustomer(farmId: string) {
    const farmer = await this.prisma.farm.findUnique({
      where: {
        userFarmId: farmId,
      }
    });
    if (!farmer) throw new NotFoundException('Farm not found');
    await this.prisma.farm.delete({
      where: {
        userFarmId: farmId,
      }
    });
    return "Farm Deleted";
  }
}
