import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  Min,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateStockLossDto {
  @ApiProperty({ example: 5, description: 'Cantidad de productos perdidos' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'Productos dañados en almacén', required: false })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  warehouseId: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario que registra la pérdida',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: '2023-10-05T14:48:00.000Z',
    description: 'Fecha y hora de la pérdida en formato ISO 8601',
  })
  @IsDateString()
  lossAt: Date;
}
