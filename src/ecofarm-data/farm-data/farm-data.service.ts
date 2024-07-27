import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class FarmDataService {
    constructor(private prisma: PrismaService) {}

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
                contactInfo: true
            }
        })
    };

    getFarmById(farmId: string) {
        return this.prisma.user.findUnique({
            where: {
                userId: farmId
            },
            select: {
                userId: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                contactInfo: true
            }
        })
    }

    getFarmByName(farmName: string) {
        return this.prisma.user.findMany({
            where: {
                firstName: farmName
            },
            select : {
                firstName: true,
                role: true,
                contactInfo: true
            }
        })
    };

    async deleteFarmById(farmId: string): Promise<{message: string}> {
        await this.prisma.user.delete({
            where: {
                userId: farmId
            }
        });
        return {message: 'Farm deleted'}
    };


    async updateFarmById(farmId: string, firstName?: string, lastName?: string, contactInfo?: string, username?: string, password?: string) {
        const farm = await this.prisma.user.findFirst({
          where: {
            userId: farmId,
          },
          select: {
            firstName: true,
            lastName: true,
            contactInfo: true,
            role: true
          }
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
            role: true
        },
        data,
        });

        return updatedFarm;
      }


}
