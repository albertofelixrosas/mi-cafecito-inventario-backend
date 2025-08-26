import { Product } from '../entities/product.entity';

export interface ProductResponseDto {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
