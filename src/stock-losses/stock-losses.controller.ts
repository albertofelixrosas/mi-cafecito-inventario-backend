import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { StockLossesService } from './stock-losses.service';
import { CreateStockLossDto } from './dto/create-stock-loss.dto';
import { UpdateStockLossDto } from './dto/update-stock-loss.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Stock Losses')
@Controller('stock-losses')
export class StockLossesController {
  constructor(private readonly stockLossesService: StockLossesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una pérdida de stock' })
  create(@Body() createStockLossDto: CreateStockLossDto) {
    return this.stockLossesService.create(createStockLossDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las pérdidas de stock' })
  findAll() {
    return this.stockLossesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una pérdida de stock por ID' })
  findOne(@Param('id') id: number) {
    return this.stockLossesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una pérdida de stock por ID' })
  update(
    @Param('id') id: number,
    @Body() updateStockLossDto: UpdateStockLossDto,
  ) {
    return this.stockLossesService.update(id, updateStockLossDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una pérdida de stock por ID' })
  remove(@Param('id') id: number) {
    return this.stockLossesService.remove(id);
  }
}
