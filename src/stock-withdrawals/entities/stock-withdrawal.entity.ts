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

@Entity({ name: 'stock_withdrawals' })
export class StockWithdrawal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @CreateDateColumn({
    name: 'withdrawal_date',
    type: 'timestamp with time zone',
  })
  withdrawalDate: Date;

  // 🔗 Relación con productos
  @ManyToOne(() => Product, product => product.stockWithdrawals, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // 🔗 Relación con almacenes
  @ManyToOne(() => Warehouse, warehouse => warehouse.stockWithdrawals, {
    eager: true,
  })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;
}
