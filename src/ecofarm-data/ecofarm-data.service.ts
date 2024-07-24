import { tr } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EcoFarmDataService {
    constructor(private prisma: PrismaService) {}

    getAllCustomers() {
        return this.prisma.user.findMany({
            where: {
                role: Role.CUSTOMER,
            },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                contactInfo: true
            }
        })
    };

    getCustomerByName(customerName: string) {
        return this.prisma.user.findMany({
            where: {
                firstName: customerName
            },
            select : {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                contactInfo: true
            }
        })
    }

    getAllFarms() {
        return this.prisma.user.findMany({
            where: {
                role: Role.FARMER
            },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                contactInfo: true
            }
        })
    };

    getAllProducts() {
        return this.prisma.products.findMany({
            select: {
                name: true,
                category: true,
                price: true
            }
        })
    };


}
