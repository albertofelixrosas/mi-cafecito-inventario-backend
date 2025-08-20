import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockWithdrawal } from './entities/stock-withdrawal.entity';
import { CreateStockWithdrawalDto } from './dto/create-stock-withdrawal.dto';
import { UpdateStockWithdrawalDto } from './dto/update-stock-withdrawal.dto';
import { Product } from '../products/entities/product.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';

@Injectable()
export class StockWithdrawalsService {
  constructor(
    @InjectRepository(StockWithdrawal)
    private readonly stockWithdrawalsRepository: Repository<StockWithdrawal>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(dto: CreateStockWithdrawalDto): Promise<StockWithdrawal> {
    const product = await this.productRepository.findOne({
      where: { productId: dto.productId },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const warehouse = await this.warehouseRepository.findOne({
      where: { warehouseId: dto.warehouseId },
    });
    if (!warehouse) throw new NotFoundException('Almacén no encontrado');

    const withdrawal = this.stockWithdrawalsRepository.create({
      quantity: dto.quantity,
      product,
      warehouse,
    });

    return this.stockWithdrawalsRepository.save(withdrawal);
  }

  findAll(): Promise<StockWithdrawal[]> {
    return this.stockWithdrawalsRepository.find({
      relations: ['product', 'warehouse'],
    });
  }

  async findOne(id: string): Promise<StockWithdrawal> {
    const withdrawal = await this.stockWithdrawalsRepository.findOne({
      where: { stockWithdrawalId: id },
      relations: ['product', 'warehouse'],
    });
    if (!withdrawal) throw new NotFoundException('Retiro no encontrado');
    return withdrawal;
  }

  async update(
    id: string,
    dto: UpdateStockWithdrawalDto,
  ): Promise<StockWithdrawal> {
    const withdrawal = await this.findOne(id);

    if (dto.productId) {
      const product = await this.productRepository.findOne({
        where: { productId: dto.productId },
      });
      if (!product) throw new NotFoundException('Producto no encontrado');
      withdrawal.product = product;
    }

    if (dto.warehouseId) {
      const warehouse = await this.warehouseRepository.findOne({
        where: { warehouseId: dto.warehouseId },
      });
      if (!warehouse) throw new NotFoundException('Almacén no encontrado');
      withdrawal.warehouse = warehouse;
    }

    if (dto.quantity !== undefined) withdrawal.quantity = dto.quantity;

    return this.stockWithdrawalsRepository.save(withdrawal);
  }

  async remove(id: string): Promise<void> {
    const withdrawal = await this.findOne(id);
    await this.stockWithdrawalsRepository.remove(withdrawal);
  }
}
