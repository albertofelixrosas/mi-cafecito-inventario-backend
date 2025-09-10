import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockWithdrawal } from './entities/stock-withdrawal.entity';
import { CreateStockWithdrawalDto } from './dto/create-stock-withdrawal.dto';
import { UpdateStockWithdrawalDto } from './dto/update-stock-withdrawal.dto';
import { Product } from '../products/entities/product.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StockWithdrawalsService {
  constructor(
    @InjectRepository(StockWithdrawal)
    private readonly stockWithdrawalRepository: Repository<StockWithdrawal>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateStockWithdrawalDto): Promise<StockWithdrawal> {
    const { productId, warehouseId, userId, ...rest } = dto;

    const product = await this.productRepository.findOneBy({ productId });
    if (!product) throw new NotFoundException(`Product ${productId} not found`);

    const warehouse = await this.warehouseRepository.findOneBy({ warehouseId });
    if (!warehouse)
      throw new NotFoundException(`Warehouse ${warehouseId} not found`);

    const user = await this.userRepository.findOneBy({ userId });
    if (!user) throw new NotFoundException(`User ${userId} not found`);

    const withdrawal = this.stockWithdrawalRepository.create({
      ...rest,
      product,
      warehouse,
      user,
    });

    return this.stockWithdrawalRepository.save(withdrawal);
  }

  findAll(): Promise<StockWithdrawal[]> {
    return this.stockWithdrawalRepository.find({
      relations: ['product', 'warehouse'],
    });
  }

  async findOne(id: number): Promise<StockWithdrawal> {
    const withdrawal = await this.stockWithdrawalRepository.findOne({
      where: { stockWithdrawalId: id },
      relations: ['product', 'warehouse', 'user'],
    });
    if (!withdrawal) throw new NotFoundException('Retiro no encontrado');
    return withdrawal;
  }

  async update(
    id: number,
    dto: UpdateStockWithdrawalDto,
  ): Promise<StockWithdrawal> {
    const withdrawal = await this.stockWithdrawalRepository.findOneBy({
      stockWithdrawalId: id,
    });

    if (!withdrawal) {
      throw new NotFoundException(`Stock withdrawal ${id} not found`);
    }

    if (dto.productId) {
      const product = await this.productRepository.findOneBy({
        productId: dto.productId,
      });
      if (!product) {
        throw new NotFoundException(`Product ${dto.productId} not found`);
      }
      withdrawal.product = product;
    }

    if (dto.warehouseId) {
      const warehouse = await this.warehouseRepository.findOneBy({
        warehouseId: dto.warehouseId,
      });
      if (!warehouse)
        throw new NotFoundException(`Warehouse ${dto.warehouseId} not found`);
      withdrawal.warehouse = warehouse;
    }

    if (dto.userId) {
      const user = await this.userRepository.findOneBy({ userId: dto.userId });
      if (!user) throw new NotFoundException(`User ${dto.userId} not found`);
      withdrawal.user = user;
    }

    Object.assign(withdrawal, dto);
    return this.stockWithdrawalRepository.save(withdrawal);
  }

  async remove(id: number): Promise<void> {
    const withdrawal = await this.findOne(id);
    await this.stockWithdrawalRepository.remove(withdrawal);
  }
}
