import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockEntry } from './entities/stock-entry.entity';
import { CreateStockEntryDto } from './dto/create-stock-entry.dto';
import { UpdateStockEntryDto } from './dto/update-stock-entry.dto';
import { Product } from '../products/entities/product.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StockEntriesService {
  constructor(
    @InjectRepository(StockEntry)
    private readonly stockEntryRepository: Repository<StockEntry>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateStockEntryDto, userId: number): Promise<StockEntry> {
    const { productId, warehouseId, ...rest } = dto;

    const product = await this.productRepository.findOneBy({ productId });
    const warehouse = await this.warehouseRepository.findOneBy({ warehouseId });
    const user = await this.userRepository.findOneBy({ userId });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${warehouseId} not found`);
    }
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const entry = this.stockEntryRepository.create({
      ...rest,
      product,
      warehouse,
      user,
    });
    return this.stockEntryRepository.save(entry);
  }

  async findAll(): Promise<StockEntry[]> {
    return this.stockEntryRepository.find({
      relations: ['product', 'warehouse', 'user'],
    });
  }

  async findOne(id: number): Promise<StockEntry> {
    const entry = await this.stockEntryRepository.findOne({
      where: { stockEntryId: id },
      relations: ['product', 'warehouse', 'user'],
    });
    if (!entry) {
      throw new NotFoundException(`StockEntry with ID ${id} not found`);
    }
    return entry;
  }

  async update(id: number, dto: UpdateStockEntryDto): Promise<StockEntry> {
    const entry = await this.findOne(id);

    if (dto.productId) {
      const product = await this.productRepository.findOneBy({
        productId: dto.productId,
      });
      if (!product)
        throw new NotFoundException(`Product ${dto.productId} not found`);
      entry.product = product;
    }

    if (dto.warehouseId) {
      const warehouse = await this.warehouseRepository.findOneBy({
        warehouseId: dto.warehouseId,
      });
      if (!warehouse)
        throw new NotFoundException(`Warehouse ${dto.warehouseId} not found`);
      entry.warehouse = warehouse;
    }

    Object.assign(entry, dto);
    return this.stockEntryRepository.save(entry);
  }

  async remove(id: number): Promise<void> {
    const entry = await this.findOne(id);
    await this.stockEntryRepository.remove(entry);
  }
}
