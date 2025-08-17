import { Module } from '@nestjs/common';
import { StockLossesService } from './stock-losses.service';
import { StockLossesController } from './stock-losses.controller';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';
import { Product } from 'src/products/entities/product.entity';
import { StockLoss } from './entities/stock-loss.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StockLoss, Product, Warehouse])],
  controllers: [StockLossesController],
  providers: [StockLossesService],
  exports: [StockLossesService],
})
export class StockLossesModule {}
