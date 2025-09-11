import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StockEntriesService } from './stock-entries.service';
import { CreateStockEntryDto } from './dto/create-stock-entry.dto';
import { UpdateStockEntryDto } from './dto/update-stock-entry.dto';
import { StockEntry } from './entities/stock-entry.entity';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Resource } from '../shared/enums/resource.enum';
import { Action } from '../shared/enums/action.enum';

@ApiTags('Stock Entries')
@Controller('stock-entries')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class StockEntriesController {
  constructor(private readonly stockEntriesService: StockEntriesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva entrada de stock' })
  @ApiResponse({
    status: 201,
    description: 'La entrada fue registrada exitosamente',
    type: StockEntry,
  })
  @RequirePermission(`${Resource.STOCKENTRIES}.${Action.CREATE}`)
  create(
    @Body() createDto: CreateStockEntryDto,
    @CurrentUser('userId') userId: number,
  ) {
    return this.stockEntriesService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las entradas de stock' })
  @ApiResponse({
    status: 200,
    description: 'Lista de entradas de stock',
    type: [StockEntry],
  })
  @RequirePermission(`${Resource.STOCKENTRIES}.${Action.READ}`)
  findAll() {
    return this.stockEntriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una entrada de stock por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Entrada encontrada',
    type: StockEntry,
  })
  @ApiResponse({ status: 404, description: 'Entrada no encontrada' })
  @RequirePermission(`${Resource.STOCKENTRIES}.${Action.READ}`)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockEntriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una entrada de stock' })
  @ApiResponse({
    status: 200,
    description: 'Entrada actualizada correctamente',
    type: StockEntry,
  })
  @RequirePermission(`${Resource.STOCKENTRIES}.${Action.UPDATE}`)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStockEntryDto,
  ) {
    return this.stockEntriesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una entrada de stock' })
  @ApiResponse({ status: 200, description: 'Entrada eliminada' })
  @ApiResponse({ status: 404, description: 'Entrada no encontrada' })
  @RequirePermission(`${Resource.STOCKENTRIES}.${Action.DELETE}`)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockEntriesService.remove(id);
  }
}
