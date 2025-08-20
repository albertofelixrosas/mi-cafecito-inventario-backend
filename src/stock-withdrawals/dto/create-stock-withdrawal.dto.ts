import { ApiProperty } from '@nestjs/swagger';
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
}
