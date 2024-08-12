import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class FarmDataService {
  constructor(private prisma: PrismaService) {}

  async createFarm(userId: string, farmName: string | 'UnKnown') {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: userId,
        role: Role.CUSTOMER,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.prisma.user.update({
      where: { userId: userId },
      data: { role: Role.FARMER },
    });
    const updatedCustomer = await this.prisma.farm.create({
      data: {
        farmName: farmName,
        userFarmId: userId,
        role: Role.FARMER,
      },
      select: {
        farmName: true,
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true,
      },
    });
    return updatedCustomer;
  }

  async updateFarmById(
    farmId: string,
    firstName?: string,
    lastName?: string,
    contactInfo?: string,
    username?: string,
    password?: string,
  ) {
    const farm = await this.prisma.user.findFirst({
      where: {
        userId: farmId,
      },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true,
      },
    });

    if (!farm) throw new NotFoundException('Farm not found');
    const data: any = {};
    if (firstName) data.firstName = firstName;
    if (lastName) data.lastName = lastName;
    if (contactInfo) data.contactInfo = contactInfo;
    if (username) data.username = username;
    if (password) data.password = await argon.hash(password);

    const updatedFarm = await this.prisma.user.update({
      where: {
        userId: farmId,
      },
      select: {
        firstName: true,
        lastName: true,
        contactInfo: true,
        role: true,
      },
      data,
    });

    return updatedFarm;
  }

  async deleteFarm(userId: string, farmId?: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });

    if (user?.role === String(Role.ADMIN)) {
      await this.prisma.farm.delete({
        where: { userFarmId: farmId },
      });
      return 'Farm deleted by Admin';
    } else if (user?.role === String(Role.FARMER)) {
      await this.prisma.user.update({
        where: { userId: userId },
        data: { role: Role.CUSTOMER },
      });
      await this.prisma.farm.delete({
        where: { userFarmId: userId },
      });
      return 'Farm deleted by farmer';
    }
    return "You don't have a Farm Account";
  }

  getAllFarms() {
    return this.prisma.user.findMany({
      where: {
        role: Role.FARMER,
      },
      select: {
        userId: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        contactInfo: true,
      },
    });
  }

  getFarmById(farmId: string) {
    return this.prisma.user.findUnique({
      where: {
        userId: farmId,
      },
      select: {
        userId: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        contactInfo: true,
      },
    });
  }

  getFarmByName(farmName: string) {
    return this.prisma.user.findMany({
      where: {
        firstName: farmName,
      },
      select: {
        firstName: true,
        role: true,
        contactInfo: true,
      },
    });
  }
}
