import { PartialType } from '@nestjs/swagger';
import { CreateStockWithdrawalDto } from './create-stock-withdrawal.dto';

export class UpdateStockWithdrawalDto extends PartialType(
  CreateStockWithdrawalDto,
) {}
