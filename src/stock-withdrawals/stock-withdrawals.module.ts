import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockWithdrawal } from '../stock-withdrawals/entities/stock-withdrawal.entity';
import { Product } from '../products/entities/product.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { StockWithdrawalsService } from './stock-withdrawals.service';
import { StockWithdrawalsController } from './stock-withdrawals.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockWithdrawal, Product, Warehouse, User]),
  ],
  controllers: [StockWithdrawalsController],
  providers: [StockWithdrawalsService],
  exports: [StockWithdrawalsService], // opcional si lo usarás en otros módulos
})
export class StockWithdrawalsModule {}
