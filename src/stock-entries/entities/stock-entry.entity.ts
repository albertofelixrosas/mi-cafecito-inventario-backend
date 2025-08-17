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

@Entity('stock_entries')
export class StockEntry {
  @PrimaryGeneratedColumn({ name: 'stock_entry_id', type: 'int' })
  stockEntryId: number;

  @Column({ type: 'timestamp' })
  incomeAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  observations?: string;

  @Column({ type: 'timestamp', nullable: true })
  expirationAt?: Date;

  @ManyToOne(() => Product, p => p.stockEntries, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'productId',
  })
  product: Product;

  @ManyToOne(() => Warehouse, w => w.stockEntries, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'warehouse_id',
    referencedColumnName: 'warehouseId',
  })
  warehouse: Warehouse;
}
