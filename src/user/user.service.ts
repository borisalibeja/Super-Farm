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
    const customer = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!customer) throw new NotFoundException('Customer not found');
    await this.prisma.user.update({
      where: {
        id: customer.id,
      },
      data: {
        role: Role.FARMER,
      },
    });
  }

  async demoteFarmertoCustomer(farmerId: string) {
    const farmer = await this.prisma.user.findFirst({
      where: {
        id: farmerId,
      },
    });
    if (!farmer) throw new NotFoundException('Farmer not found');
    await this.prisma.user.update({
      where: {
        id: farmer.id,
      },
      data: {
        role: Role.CUSTOMER,
      },
    });
  }
}
