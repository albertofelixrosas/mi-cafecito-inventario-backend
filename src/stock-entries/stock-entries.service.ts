import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockEntry } from './entities/stock-entry.entity';
import { CreateStockEntryDto } from './dto/create-stock-entry.dto';
import { UpdateStockEntryDto } from './dto/update-stock-entry.dto';

@Injectable()
export class StockEntriesService {
  constructor(
    @InjectRepository(StockEntry)
    private readonly stockEntryRepository: Repository<StockEntry>,
  ) {}

  async create(createDto: CreateStockEntryDto): Promise<StockEntry> {
    const entry = this.stockEntryRepository.create(createDto);
    return this.stockEntryRepository.save(entry);
  }

  async findAll(): Promise<StockEntry[]> {
    return this.stockEntryRepository.find({
      relations: ['product', 'warehouse'],
    });
  }

  async findOne(id: number): Promise<StockEntry> {
    const entry = await this.stockEntryRepository.findOne({
      where: { stockEntryId: id },
      relations: ['product', 'warehouse'],
    });
    if (!entry) {
      throw new NotFoundException(`StockEntry with ID ${id} not found`);
    }
    return entry;
  }

  async update(
    id: number,
    updateDto: UpdateStockEntryDto,
  ): Promise<StockEntry> {
    const entry = await this.findOne(id);
    Object.assign(entry, updateDto);
    return this.stockEntryRepository.save(entry);
  }

  async remove(id: number): Promise<void> {
    const entry = await this.findOne(id);
    await this.stockEntryRepository.remove(entry);
  }
}
