import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockEntriesService } from './stock-entries.service';
import { CreateStockEntryDto } from './dto/create-stock-entry.dto';
import { UpdateStockEntryDto } from './dto/update-stock-entry.dto';

@Controller('stock-entries')
export class StockEntriesController {
  constructor(private readonly stockEntriesService: StockEntriesService) {}

  @Post()
  create(@Body() createStockEntryDto: CreateStockEntryDto) {
    return this.stockEntriesService.create(createStockEntryDto);
  }

  @Get()
  findAll() {
    return this.stockEntriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockEntryDto: UpdateStockEntryDto) {
    return this.stockEntriesService.update(+id, updateStockEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockEntriesService.remove(+id);
  }
}
