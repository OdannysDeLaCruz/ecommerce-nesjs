import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';
import { ProductService } from 'src/products/services/product.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 12,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(Number(productId));
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    const created = this.productService.create(payload);
    return {
      message: 'Producto creado',
      created,
    };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const updated = this.productService.update(Number(id), payload);
    if (!updated) {
      return {
        message: 'Producto no actualizado',
        id,
      };
    }

    return {
      message: 'Producto actualizado',
      updated,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    const deleted = this.productService.delete(Number(id));
    if (!deleted) {
      return {
        message: 'Producto no encontrado',
        id,
      };
    }

    return {
      message: 'Producto eliminado',
      deleted,
    };
  }
}
