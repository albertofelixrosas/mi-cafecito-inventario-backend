import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { StockWithdrawalsService } from './stock-withdrawals.service';
import { CreateStockWithdrawalDto } from './dto/create-stock-withdrawal.dto';
import { UpdateStockWithdrawalDto } from './dto/update-stock-withdrawal.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StockWithdrawal } from './entities/stock-withdrawal.entity';

@ApiTags('Stock Withdrawals')
@Controller('stock-withdrawals')
export class StockWithdrawalsController {
  constructor(
    private readonly stockWithdrawalsService: StockWithdrawalsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un retiro de inventario' })
  @ApiResponse({ status: 201, type: StockWithdrawal })
  create(@Body() dto: CreateStockWithdrawalDto) {
    return this.stockWithdrawalsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los retiros de inventario' })
  findAll() {
    return this.stockWithdrawalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un retiro por su ID' })
  findOne(@Param('id') id: number) {
    return this.stockWithdrawalsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un retiro de inventario' })
  update(@Param('id') id: number, @Body() dto: UpdateStockWithdrawalDto) {
    return this.stockWithdrawalsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un retiro de inventario' })
  remove(@Param('id') id: number) {
    return this.stockWithdrawalsService.remove(id);
  }
}
