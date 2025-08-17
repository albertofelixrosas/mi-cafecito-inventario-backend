import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(dto: CreateWarehouseDto): Promise<Warehouse> {
    const warehouse = this.warehouseRepository.create(dto);
    return await this.warehouseRepository.save(warehouse);
  }

  async findAll(): Promise<Warehouse[]> {
    return await this.warehouseRepository.find();
  }

  async findOne(warehouseId: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOne({
      where: { warehouseId },
    });
    if (!warehouse)
      throw new NotFoundException(`Warehouse #${warehouseId} not found`);
    return warehouse;
  }

  async update(
    warehouseId: number,
    dto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    const warehouse = await this.findOne(warehouseId);
    Object.assign(warehouse, dto);
    return await this.warehouseRepository.save(warehouse);
  }

  async remove(warehouseId: number): Promise<void> {
    const result = await this.warehouseRepository.delete(warehouseId);
    if (result.affected === 0) {
      throw new NotFoundException(`Warehouse #${warehouseId} not found`);
    }
  }
}
