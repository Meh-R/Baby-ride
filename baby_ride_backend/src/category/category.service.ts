import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { dot } from 'node:test/reporters';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCategoryDto } from './dto/create.category.dto';
import { updateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategory(page: number) {
    return this.prisma.category.findMany({
      orderBy: {
        type: 'desc',
      },
      skip: page * 4,
      take: 4,
      select: {
        id: true,
        type: true,
        picsCategory: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findCategory(query: string) {
    return this.prisma.category.findMany({
      where: {
        OR: [
          {
            type: {
              contains: query,
            },
          },
        ],
      },
    });
  }

  async createCategory(dto: createCategoryDto) {
    // const userVerif = await this.prisma.user.findUnique({
    //   where: {
    //     id: user.id,
    //   },
    // });
    // if (!userVerif || userVerif.role != 'admin') {
    //   throw new ForbiddenException('no right');
    // }
    return await this.prisma.category.create({
      data: {
        ...dto,
      },
    });
  }

  async updateCategory(id: string, dto: updateCategoryDto) {
    // const userVerif = await this.prisma.user.findUnique({
    //   where: {
    //     id: user.id,
    //   },
    // });
    // if (!userVerif || userVerif.role != 'admin') {
    //   throw new ForbiddenException('no right');
    // }

    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingCategory) {
      throw new ForbiddenException('Category to update not found');
    }

    return await this.prisma.category.update({
      where: {
        id: id,
      },
      data: { ...dto },
    });
  }

  async deleteCategory(id: string) {
    // const userVerif = await this.prisma.user.findUnique({
    //   where: {
    //     id: user.id,
    //   },
    // });
    // if (!userVerif || userVerif.role != 'admin') {
    //   throw new ForbiddenException('no right');
    // }

    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingCategory) {
      throw new ForbiddenException('Category to delete not found');
    }

    const products = await this.prisma.product.findMany({
      where: {
        categoryId: id,
      },
    });

    for (const product of products) {
      await this.prisma.cart_Has_Product.deleteMany({
        where: {
          productId: product.id,
        },
      });
    }

    await this.prisma.product.deleteMany({
      where: { categoryId: id },
    });

    await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
    return 'Category deleted';
  }
}
