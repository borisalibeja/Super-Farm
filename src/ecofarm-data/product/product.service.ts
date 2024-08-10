import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductDataService {
  constructor(private prisma: PrismaService) {}

  getAllProducts() {
    return this.prisma.product.findMany({
      select: {
        productName: true,
        category: true,
        price: true,
      },
    });
  }

  getProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: {
        productId: productId,
      },
      select: {
        productName: true,
        category: true,
        price: true,
      },
    });
  }

  getProductByName(productName: string) {
    return this.prisma.product.findMany({
      where: {
        productName: productName,
      },
      select: {
        productName: true,
        category: true,
        price: true,
      },
    });
  }

  async deleteProductById(productId: string): Promise<{ message: string }> {
    await this.prisma.product.delete({
      where: {
        productId: productId,
      },
    });
    return { message: 'Product deleted' };
  }

  async createProduct(
    productName: string,
    category: string,
    price: string,
    farmId: string,
  ): Promise<{
    productName: string;
    category: string;
    price: string;
    farmId?: string;
  }> {
    return this.prisma.product.create({
      data: {
        productName: productName,
        category: category,
        price: price,
        productFarmId: farmId,
      },
      select: {
        productName: true,
        category: true,
        price: true,
        productFarmId: true,
      },
    });
  }

  async updateProductById(
    productId: string,
    productName?: string,
    category?: string,
    price?: string,
  ) {
    const product = await this.prisma.product.findFirst({
      where: {
        productId: productId,
      },
      select: {
        productName: true,
        category: true,
        price: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found');
    const data: any = {};
    if (productName) data.productName = productName;
    if (category) data.category = category;
    if (price) data.price = price;

    const updatedProduct = await this.prisma.product.update({
      where: {
        productId: productId,
      },
      select: {
        productName: true,
        category: true,
        price: true,
      },
      data,
    });

    return updatedProduct;
  }
}
