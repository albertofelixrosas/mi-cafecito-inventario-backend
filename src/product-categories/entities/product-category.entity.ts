import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn({ name: 'product_category_id' })
  productCategoryId: number;

  @Column({ name: 'product_category_name', type: 'varchar', length: 255 })
  productCategoryName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ name: 'photo_url', type: 'text', nullable: true })
  photoUrl?: string;

  // Relación con productos
  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
