import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockWithdrawalsService } from './stock-withdrawals.service';
import { CreateStockWithdrawalDto } from './dto/create-stock-withdrawal.dto';
import { UpdateStockWithdrawalDto } from './dto/update-stock-withdrawal.dto';

@Controller('stock-withdrawals')
export class StockWithdrawalsController {
  constructor(private readonly stockWithdrawalsService: StockWithdrawalsService) {}

  @Post()
  create(@Body() createStockWithdrawalDto: CreateStockWithdrawalDto) {
    return this.stockWithdrawalsService.create(createStockWithdrawalDto);
  }

  @Get()
  findAll() {
    return this.stockWithdrawalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockWithdrawalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockWithdrawalDto: UpdateStockWithdrawalDto) {
    return this.stockWithdrawalsService.update(+id, updateStockWithdrawalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockWithdrawalsService.remove(+id);
  }
}
