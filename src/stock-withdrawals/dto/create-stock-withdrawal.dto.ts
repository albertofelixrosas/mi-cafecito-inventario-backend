import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateStockWithdrawalDto {
  @ApiProperty({ example: 5, description: 'Cantidad retirada del inventario' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    example: 1,
    description: 'ID del producto retirado',
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    example: 1,
    description: 'ID del almacén de donde se retira',
  })
  @IsInt()
  warehouseId: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario que realiza la retirada',
  })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({
    example: 'Retiro para una orden de venta',
    description: 'Observaciones sobre la retirada',
  })
  observations?: string;
}
