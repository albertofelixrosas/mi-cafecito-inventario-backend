// warehouses/entities/warehouse.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StockEntry } from '../../stock-entries/entities/stock-entry.entity';
import { StockLoss } from '../../stock-losses/entities/stock-loss.entity';
import { StockWithdrawal } from '../../stock-withdrawals/entities/stock-withdrawal.entity';

@Entity('warehouses')
export class Warehouse {
  @PrimaryGeneratedColumn({ name: 'warehouse_id', type: 'int' })
  warehouseId: number;

  @Column({ name: 'warehouse_name', type: 'varchar', length: 255 })
  warehouseName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  location?: string;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl?: string;

  @OneToMany(() => StockEntry, e => e.warehouse)
  stockEntries: StockEntry[];

  @OneToMany(() => StockLoss, l => l.warehouse)
  stockLosses: StockLoss[];

  @OneToMany(() => StockWithdrawal, w => w.warehouse)
  stockWithdrawals: StockWithdrawal[];
}
