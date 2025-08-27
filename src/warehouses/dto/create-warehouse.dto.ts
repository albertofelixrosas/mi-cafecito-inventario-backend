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

  @ApiPropertyOptional({
    description: 'URL de la foto del almacén',
    example: 'https://mi-cdn.com/almacenes/cocina.png',
  })
  @IsString()
  @IsOptional()
  photoUrl?: string;
}
