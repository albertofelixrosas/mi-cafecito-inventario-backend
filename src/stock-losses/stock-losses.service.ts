import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockLoss } from './entities/stock-loss.entity';
import { CreateStockLossDto } from './dto/create-stock-loss.dto';
import { UpdateStockLossDto } from './dto/update-stock-loss.dto';

@Injectable()
export class StockLossesService {
  constructor(
    @InjectRepository(StockLoss)
    private readonly stockLossRepository: Repository<StockLoss>,
  ) {}

  async create(createStockLossDto: CreateStockLossDto): Promise<StockLoss> {
    const stockLoss = this.stockLossRepository.create(createStockLossDto);
    return this.stockLossRepository.save(stockLoss);
  }

  async findAll(): Promise<StockLoss[]> {
    return this.stockLossRepository.find({
      relations: ['product', 'warehouse'],
    });
  }

  async findOne(id: number): Promise<StockLoss> {
    const stockLoss = await this.stockLossRepository.findOne({
      where: { stockLossId: id },
      relations: ['product', 'warehouse'],
    });
    if (!stockLoss) throw new NotFoundException(`StockLoss ${id} not found`);
    return stockLoss;
  }

  async update(
    id: number,
    updateStockLossDto: UpdateStockLossDto,
  ): Promise<StockLoss> {
    const stockLoss = await this.findOne(id);
    Object.assign(stockLoss, updateStockLossDto);
    return this.stockLossRepository.save(stockLoss);
  }

  async remove(id: number): Promise<void> {
    const stockLoss = await this.findOne(id);
    await this.stockLossRepository.remove(stockLoss);
  }
}
