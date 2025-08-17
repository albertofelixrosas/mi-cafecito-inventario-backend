import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockLossesService } from './stock-losses.service';
import { CreateStockLossDto } from './dto/create-stock-loss.dto';
import { UpdateStockLossDto } from './dto/update-stock-loss.dto';

@Controller('stock-losses')
export class StockLossesController {
  constructor(private readonly stockLossesService: StockLossesService) {}

  @Post()
  create(@Body() createStockLossDto: CreateStockLossDto) {
    return this.stockLossesService.create(createStockLossDto);
  }

  @Get()
  findAll() {
    return this.stockLossesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockLossesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockLossDto: UpdateStockLossDto) {
    return this.stockLossesService.update(+id, updateStockLossDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockLossesService.remove(+id);
  }
}
