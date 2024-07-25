import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FarmDataService {
    constructor(private prisma: PrismaService) {}

    
    getAllFarms() {
        return this.prisma.user.findMany({
            where: {
                role: Role.FARMER
            },
            select: {
                firstName: true,
                lastName: true,
                role: true,
                contactInfo: true
            }
        })
    };
    
    getFarmByName(farmName: string) {
        return this.prisma.user.findMany({
            where: {
                firstName: farmName
            },
            select : {
                firstName: true,
                lastName: true,
                role: true,
                contactInfo: true
            }
        })
    };
}
