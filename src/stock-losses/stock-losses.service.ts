import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockLoss } from './entities/stock-loss.entity';
import { CreateStockLossDto } from './dto/create-stock-loss.dto';
import { UpdateStockLossDto } from './dto/update-stock-loss.dto';
import { Product } from '../products/entities/product.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StockLossesService {
  constructor(
    @InjectRepository(StockLoss)
    private readonly stockLossRepository: Repository<StockLoss>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateStockLossDto): Promise<StockLoss> {
    const { productId, warehouseId, userId, ...rest } = dto;

    const product = await this.productRepository.findOneBy({ productId });
    if (!product) throw new NotFoundException(`Product ${productId} not found`);

    const warehouse = await this.warehouseRepository.findOneBy({ warehouseId });
    if (!warehouse)
      throw new NotFoundException(`Warehouse ${warehouseId} not found`);

    const user = await this.userRepository.findOneBy({ userId });
    if (!user) throw new NotFoundException(`User ${userId} not found`);

    const loss = this.stockLossRepository.create({
      ...rest,
      product,
      warehouse,
      user,
    });

    return this.stockLossRepository.save(loss);
  }

  async findAll(): Promise<StockLoss[]> {
    return this.stockLossRepository.find();
  }

  async findOne(id: number): Promise<StockLoss> {
    const loss = await this.stockLossRepository.findOneBy({ stockLossId: id });
    if (!loss) throw new NotFoundException(`StockLoss ${id} not found`);
    return loss;
  }

  async update(id: number, dto: UpdateStockLossDto): Promise<StockLoss> {
    const loss = await this.findOne(id);

    if (dto.productId) {
      const product = await this.productRepository.findOneBy({
        productId: dto.productId,
      });
      if (!product)
        throw new NotFoundException(`Product ${dto.productId} not found`);
      loss.product = product;
    }

    if (dto.warehouseId) {
      const warehouse = await this.warehouseRepository.findOneBy({
        warehouseId: dto.warehouseId,
      });
      if (!warehouse)
        throw new NotFoundException(`Warehouse ${dto.warehouseId} not found`);
      loss.warehouse = warehouse;
    }

    if (dto.userId) {
      const user = await this.userRepository.findOneBy({ userId: dto.userId });
      if (!user) throw new NotFoundException(`User ${dto.userId} not found`);
      loss.user = user;
    }

    Object.assign(loss, dto);
    return this.stockLossRepository.save(loss);
  }

  async remove(id: number): Promise<void> {
    const loss = await this.findOne(id);
    await this.stockLossRepository.remove(loss);
  }
}
