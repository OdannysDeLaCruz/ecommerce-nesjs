import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':categoryId/products/:productId')
  getCategories(
    @Param('categoryId') categoryId: number,
    @Param('productId') productId: number,
  ) {
    return { categoryId, productId };
  }
}
