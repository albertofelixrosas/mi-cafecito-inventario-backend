import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(dto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOne(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['category'],
    });
    if (!product)
      throw new NotFoundException(`Product #${productId} not found`);
    return product;
  }

  async update(productId: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(productId);
    Object.assign(product, dto);
    return await this.productRepository.save(product);
  }

  async remove(productId: number): Promise<void> {
    const result = await this.productRepository.delete(productId);
    if (result.affected === 0) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
  }
}
