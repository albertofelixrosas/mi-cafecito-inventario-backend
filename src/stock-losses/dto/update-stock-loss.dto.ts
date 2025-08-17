import { PartialType } from '@nestjs/swagger';
import { CreateStockLossDto } from './create-stock-loss.dto';

export class UpdateStockLossDto extends PartialType(CreateStockLossDto) {}
