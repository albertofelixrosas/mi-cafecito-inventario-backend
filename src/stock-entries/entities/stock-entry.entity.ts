// stock-entries/entities/stock-entry.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';
import { User } from '../../users/entities/user.entity';

@Entity('stock_entries')
export class StockEntry {
  @PrimaryGeneratedColumn({ name: 'stock_entry_id', type: 'int' })
  stockEntryId: number;

  @Column({ name: 'warehouse_id' })
  warehouseId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    name: 'income_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  incomeAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observations?: string;

  @Column({ name: 'expiration_at', type: 'timestamp', nullable: true })
  expirationAt?: Date;

  @ManyToOne(() => Product, p => p.stockEntries, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @ManyToOne(() => Warehouse, w => w.stockEntries, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'warehouse_id',
  })
  warehouse: Warehouse;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
