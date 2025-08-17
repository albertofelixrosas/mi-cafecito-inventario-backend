// products/entities/product.entity.ts
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

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  productName: string;

  @Column({ type: 'varchar', length: 50 })
  unitOfMeasurement: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  isElaborated: boolean;

  @Column({ type: 'boolean', default: false })
  isPortioned: boolean;

  @Column({ type: 'text', nullable: true })
  photoUrl?: string;

  // FK a categoría (products.product_category_id -> product_categories.product_category_id)
  @ManyToOne(() => ProductCategory, c => c.products, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({
    name: 'product_category_id', // nombre de columna FK en DB (snake_case)
    referencedColumnName: 'productCategoryId', // nombre de la PK en la entidad categoría
  })
  productCategory: ProductCategory;

  // Si quieres exponer el id crudo en respuestas/servicio sin duplicar columna:
  // (no marques esto con @Column para evitar crear 2 columnas)
  // productCategoryId?: number;

  @OneToMany(() => StockEntry, e => e.product)
  stockEntries: StockEntry[];

  @OneToMany(() => StockLoss, l => l.product)
  stockLosses: StockLoss[];

  @OneToMany(() => StockWithdrawal, w => w.product)
  stockWithdrawals: StockWithdrawal[];
}
