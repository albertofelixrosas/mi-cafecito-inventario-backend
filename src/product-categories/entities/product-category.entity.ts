import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  productCategoryId: number;

  @Column({ type: 'varchar', length: 255 })
  productCategoryName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  photoUrl?: string;

  // Relación con productos
  @OneToMany(() => Product, product => product.productCategory)
  products: Product[];
}
