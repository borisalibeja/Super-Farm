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


  async promoteCustomertoFarmer(customerId: string) {
    const customer = await this.prisma.user.findFirst({
      where: {
        id: customerId,
      },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true
      }
    });
    if (!customer) throw new NotFoundException('Customer not found');
    await this.prisma.user.update({
      where: {
        id: customerId,
      },
      data: {
        role: Role.FARMER,
      },
    });
    return customer;
  }


  async demoteFarmertoCustomer(farmerId: string) {
    const farmer = await this.prisma.user.findFirst({
      where: {
        id: farmerId,
      },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true
      }
    });
    if (!farmer) throw new NotFoundException('Farmer not found');
    await this.prisma.user.update({
      where: {
        id: farmerId,
      },
      data: {
        role: Role.CUSTOMER,
      },
    });
    return farmer;
  }
}
