import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, IsOptional, IsString } from 'class-validator';

export class CreateStockLossDto {
  @ApiProperty({ example: 5, description: 'Cantidad de productos perdidos' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'Productos dañados en almacén', required: false })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ example: 'uuid-del-producto' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 'uuid-del-almacen' })
  @IsUUID()
  warehouseId: string;
}
