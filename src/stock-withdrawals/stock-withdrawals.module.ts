import { Module } from '@nestjs/common';
import { StockWithdrawalsService } from './stock-withdrawals.service';
import { StockWithdrawalsController } from './stock-withdrawals.controller';

@Module({
  controllers: [StockWithdrawalsController],
  providers: [StockWithdrawalsService],
})
export class StockWithdrawalsModule {}
