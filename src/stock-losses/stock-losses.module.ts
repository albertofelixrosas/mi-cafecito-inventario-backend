import { Module } from '@nestjs/common';
import { StockLossesService } from './stock-losses.service';
import { StockLossesController } from './stock-losses.controller';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { Product } from '../products/entities/product.entity';
import { StockLoss } from './entities/stock-loss.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockLoss, Product, Warehouse, User])],
  controllers: [StockLossesController],
  providers: [StockLossesService],
  exports: [StockLossesService],
})
export class StockLossesModule {}
