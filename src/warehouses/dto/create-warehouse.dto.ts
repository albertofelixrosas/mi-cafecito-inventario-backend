import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({
    description: 'Nombre del almacén',
    example: 'cocina',
  })
  @IsString()
  @IsNotEmpty()
  warehouseName: string;

  @ApiPropertyOptional({
    description: 'Ubicación del almacén',
    example: 'El cuatro',
  })
  @IsString()
  @IsOptional()
  location?: string;
}
