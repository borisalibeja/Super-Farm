import { tr } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
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
        createdAt: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true
      },
    });
  }


  async promoteCustomertoFarmer(userId: string, farmName: string | 'UnKnown') {
    const customer = await this.prisma.user.findFirst({
      where: {
        userId: userId,
      }
    });
    if (!customer) throw new NotFoundException('Customer not found');
    const updatedCustomer = await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        role: Role.FARMER,
        farmName: farmName,
      },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true,
        farmName: true
      }
    });
    return updatedCustomer;
  }


  async demoteFarmertoCustomer(farmerId: string) {
    const farmer = await this.prisma.user.findFirst({
      where: {
        userId: farmerId,
      }
    });
    if (!farmer) throw new NotFoundException('Farmer not found');
    const updatedFarmer = await this.prisma.user.update({
      where: {
        userId: farmerId,
      },
      data: {
        role: Role.CUSTOMER,
      },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true
      }
    });
    return updatedFarmer;
  }
}
