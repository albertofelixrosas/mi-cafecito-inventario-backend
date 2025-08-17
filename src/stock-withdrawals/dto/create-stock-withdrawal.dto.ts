import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateStockWithdrawalDto {
  @ApiProperty({ example: 5, description: 'Cantidad retirada del inventario' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'ID del producto retirado',
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'ID del almacén de donde se retira',
  })
  @IsUUID()
  warehouseId: number;
}
