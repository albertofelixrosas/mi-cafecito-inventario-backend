import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreateStockEntryDto {
  @ApiProperty({
    example: '2025-08-15T10:00:00Z',
    description: 'Fecha de ingreso',
  })
  @IsDateString()
  @IsNotEmpty()
  incomeAt: Date;

  @ApiProperty({ example: 100, description: 'Cantidad ingresada' })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 'Lote con empaques dañados revisados',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  observations?: string;

  @ApiProperty({
    example: '2026-01-01T00:00:00Z',
    required: false,
    description: 'Fecha de expiración',
  })
  @IsDateString()
  @IsOptional()
  expirationAt?: Date;

  @ApiProperty({ example: 1, description: 'ID del producto' })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2, description: 'ID del almacén' })
  @IsInt()
  warehouseId: number;
}
