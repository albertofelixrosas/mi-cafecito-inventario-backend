import { Injectable } from '@nestjs/common';
import { CreateStockWithdrawalDto } from './dto/create-stock-withdrawal.dto';
import { UpdateStockWithdrawalDto } from './dto/update-stock-withdrawal.dto';

@Injectable()
export class StockWithdrawalsService {
  create(createStockWithdrawalDto: CreateStockWithdrawalDto) {
    return 'This action adds a new stockWithdrawal';
  }

  findAll() {
    return `This action returns all stockWithdrawals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockWithdrawal`;
  }

  update(id: number, updateStockWithdrawalDto: UpdateStockWithdrawalDto) {
    return `This action updates a #${id} stockWithdrawal`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockWithdrawal`;
  }
}
