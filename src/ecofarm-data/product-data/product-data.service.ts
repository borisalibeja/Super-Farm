import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductDataService {
    constructor(private prisma: PrismaService) {}

    
    getAllProducts() {
        return this.prisma.products.findMany({
            select: {
                productName: true,
                category: true,
                price: true
            }
        })
    };

    getProductById(productId: string) {
        return this.prisma.products.findUnique({
            where: {
                productId: productId
            },
            select: {
                productName: true,
                category: true,
                price: true
            }
        })
    }

    getProductByName(productName: string) {
        return this.prisma.products.findMany({
            where: {
                productName: productName
            },
            select : {
                productName: true,
                category: true,
                price: true
            }
        })
    };

    async deleteProductById(productId: string): Promise<{message: string}> {
        await this.prisma.products.delete({
            where: {
                productId: productId
            }
        });
        return {message: 'Product deleted'}
    };

    async createProduct(
        productName: string, 
        category: string, 
        price: string, 
        farmId: string | null, 
        farmName: string | null
    ) : Promise<{ productName: string; category: string; price: string; farmId: string | null, farmName: string | null}> {
        return this.prisma.products.create({
            data: { 
                productName: productName,
                category: category,
                price: price,
                farmId: farmId ? farmId : null,
                farmName: farmName ? farmName : null,
            },
            select: {
                productName: true,
                category: true,
                price: true,
                farmId: true,
                farmName: true,

            }
        });
    }


    async updateProductById(productId:string, productName?: string, category?: string, price?: string) {
        const product = await this.prisma.products.findFirst({
          where: {
            productId: productId,
          },
          select: {
            productName: true,
            category: true,
            price: true
          }
        });

        if (!product) throw new NotFoundException('Product not found');
        const data: any = {};
        if (productName) data.productName = productName;
        if (category) data.category = category;
        if (price) data.price = price;

        const updatedProduct = await this.prisma.products.update({
        where: {
            productId: productId,
        },
        select: {
            productName: true,
            category: true,
            price: true
        },
        data,
        });

        return updatedProduct;
      }


}
