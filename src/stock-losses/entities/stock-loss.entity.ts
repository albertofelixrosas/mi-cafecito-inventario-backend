// stock-losses/entities/stock-loss.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';

@Entity('stock_losses')
export class StockLoss {
  @PrimaryGeneratedColumn({ name: 'stock_loss_id', type: 'int' })
  stockLossId: number;

  @Column({ name: 'warehouse_id' })
  warehouseId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @CreateDateColumn({ name: 'loss_date', type: 'timestamp with time zone' })
  lossDate: Date;

  @ManyToOne(() => Product, p => p.stockLosses, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(() => Warehouse, w => w.stockLosses, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'warehouse_id',
  })
  warehouse: Warehouse;
}
