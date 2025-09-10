import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { FilterProductCategoriesDto } from './dto/filter-product-categories.dt';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly categoryRepository: Repository<ProductCategory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createDto: CreateProductCategoryDto): Promise<ProductCategory> {
    const category = this.categoryRepository.create(createDto);
    return this.categoryRepository.save(category);
  }

  async findAll(
    filters?: FilterProductCategoriesDto,
  ): Promise<ProductCategory[]> {
    const { name: search } = filters || {};
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.productCategoryName', 'ASC');

    if (search) {
      query.where(
        '(category.productCategoryName ILIKE :search OR category.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<ProductCategory> {
    const category = await this.categoryRepository.findOne({
      where: { productCategoryId: id },
      /* relations: ['products'], */
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    const category = await this.findOne(id);
    Object.assign(category, updateDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    // Verificar si la categoría tiene productos asociados
    const products = await this.productRepository.find({
      where: { category: { productCategoryId: id } },
    });

    if (products.length > 0) {
      throw new NotFoundException(
        `No se puede eliminar la categoría "${category.productCategoryName}" por que tiene productos asociados`,
      );
    }
    await this.categoryRepository.remove(category);
  }
}
