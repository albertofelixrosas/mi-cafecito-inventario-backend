import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';
import { StockEntry } from '../../stock-entries/entities/stock-entry.entity';
import { StockLoss } from '../../stock-losses/entities/stock-loss.entity';
import { StockWithdrawal } from '../../stock-withdrawals/entities/stock-withdrawal.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id', type: 'int' })
  productId: number;

  @Column({ name: 'product_category_id' })
  productCategoryId: number;

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  productName: string;

  @Column({ name: 'unit_of_measurement', type: 'varchar', length: 50 })
  unitOfMeasurement: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ name: 'is_elaborated', type: 'boolean', default: false })
  isElaborated: boolean;

  @Column({ name: 'is_portioned', type: 'boolean', default: false })
  isPortioned: boolean;

  @Column({
    name: 'bar_code',
    length: 13,
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  barCode: string;

  @Column({ name: 'min_stock', type: 'int' })
  minStock: number;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl?: string;

  // FK a categoría (products.product_category_id -> product_categories.product_category_id)
  @ManyToOne(() => ProductCategory, c => c.products, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'product_category_id', // nombre de columna FK en DB (snake_case)
  })
  category: ProductCategory;

  @OneToMany(() => StockEntry, e => e.product)
  stockEntries: StockEntry[];

  @OneToMany(() => StockLoss, l => l.product)
  stockLosses: StockLoss[];

  @OneToMany(() => StockWithdrawal, w => w.product)
  stockWithdrawals: StockWithdrawal[];
}
