import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Warehouse } from './entities/warehouse.entity';

@ApiTags('Warehouses')
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo almacén' })
  @ApiResponse({ status: 201, type: Warehouse })
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los almacenes' })
  @ApiResponse({ status: 200, type: [Warehouse] })
  findAll() {
    return this.warehousesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un almacén por su ID' })
  @ApiResponse({ status: 200, type: Warehouse })
  findOne(@Param('id') id: string) {
    return this.warehousesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un almacén por su ID' })
  @ApiResponse({ status: 200, type: Warehouse })
  update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehousesService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un almacén por su ID' })
  @ApiResponse({ status: 200, description: 'Almacén eliminado correctamente' })
  remove(@Param('id') id: string) {
    return this.warehousesService.remove(+id);
  }
}
