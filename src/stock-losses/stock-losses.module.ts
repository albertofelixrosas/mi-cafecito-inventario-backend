import { Module } from '@nestjs/common';
import { StockLossesService } from './stock-losses.service';
import { StockLossesController } from './stock-losses.controller';

@Module({
  controllers: [StockLossesController],
  providers: [StockLossesService],
})
export class StockLossesModule {}
