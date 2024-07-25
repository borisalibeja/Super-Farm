import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductDataService {
    constructor(private prisma: PrismaService) {}

    
    getAllProducts() {
        return this.prisma.products.findMany({
            select: {
                name: true,
                category: true,
                price: true
            }
        })
    };
    
    getProductByName(productName: string) {
        return this.prisma.products.findMany({
            where: {
                name: productName
            },
            select : {
                name: true,
                category: true,
                price: true
            }
        })
    };

}
