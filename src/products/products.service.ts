import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from 'src/product-categories/entities/product-category.entity';
import { FilterProductsDto } from './dto/filter-products.dt';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const productCategory = await this.productCategoryRepository.findOne({
      where: { productCategoryId: dto.productCategoryId },
    });
    if (!productCategory) {
      throw new NotFoundException(
        `No existe una categoría de producto con id ${dto.productCategoryId}`,
      );
    }
    const product = this.productRepository.create(dto);
    return await this.productRepository.save(product);
  }

  async findAll(filterDto: FilterProductsDto): Promise<Product[]> {
    const { name, categoryId, page = 1, limit = 10 } = filterDto;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.productName', 'ASC'); // 👈 campo real en la entidad

    if (name) {
      query.andWhere(
        '(product.productName ILIKE :name OR product.description ILIKE :name)',
        { name: `%${name}%` },
      );
    }

    if (categoryId) {
      query.andWhere('category.productCategoryId = :categoryId', {
        categoryId,
      }); // 👈 FK real en ProductCategory
    }

    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
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
