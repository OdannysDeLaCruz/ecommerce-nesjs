import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  private incrementalProductId = 1;
  private products: Array<Product> = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if ( !product ) {
      throw new NotFoundException(`Producto con id ${id} no existe.`)
    }

    return product
  }

  create(payload: CreateProductDto) {
    this.incrementalProductId += 1
    const newProduct = { ...payload, id: this.incrementalProductId };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    console.log(id, payload);
    const productFound = this.findOne(id);
    if (productFound) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = { ...productFound, ...payload };
      return this.products[index];
    }
    return false;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    this.products.splice(index, 1);
    return true;
  }
}
