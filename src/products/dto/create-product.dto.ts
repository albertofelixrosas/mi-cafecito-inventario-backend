import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Café Americano',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  productName: string;

  @ApiProperty({ example: 'ml', description: 'Unidad de medida' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  unitOfMeasurement: string;

  @ApiProperty({
    example: 'Café negro sin azúcar',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: true, description: 'Si el producto es elaborado' })
  @IsBoolean()
  @IsOptional()
  isElaborated?: boolean;

  @ApiProperty({ example: false, description: 'Si el producto se porciona' })
  @IsBoolean()
  @IsOptional()
  isPortioned?: boolean;

  @ApiProperty({
    example: 'https://mi-cdn.com/products/cafe.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  photoUrl?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la categoría a la que pertenece el producto',
  })
  @IsInt()
  productCategoryId: number;
}
