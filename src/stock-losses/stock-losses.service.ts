import { Injectable } from '@nestjs/common';
import { CreateStockLossDto } from './dto/create-stock-loss.dto';
import { UpdateStockLossDto } from './dto/update-stock-loss.dto';

@Injectable()
export class StockLossesService {
  create(createStockLossDto: CreateStockLossDto) {
    return 'This action adds a new stockLoss';
  }

  findAll() {
    return `This action returns all stockLosses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockLoss`;
  }

  update(id: number, updateStockLossDto: UpdateStockLossDto) {
    return `This action updates a #${id} stockLoss`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockLoss`;
  }
}
