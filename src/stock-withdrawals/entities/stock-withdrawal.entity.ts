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
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'stock_withdrawals' })
export class StockWithdrawal {
  @PrimaryGeneratedColumn({ name: 'stock_withdrawal_id' })
  stockWithdrawalId: string;

  @Column({ name: 'warehouse_id' })
  warehouseId: number;

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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
