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


  async promoteCustomertoFarmer(customerId: string) {
    const customer = await this.prisma.user.findFirst({
      where: {
        userId: customerId,
      }
    });
    if (!customer) throw new NotFoundException('Customer not found');
    const updatedCustomer = await this.prisma.user.update({
      where: {
        userId: customerId,
      },
      data: {
        role: Role.FARMER,
      },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true
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
