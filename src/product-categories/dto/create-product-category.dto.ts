import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 'Bebidas', description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  productCategoryName: string;

  @ApiProperty({ example: 'Cafés, tés, jugos, etc.', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    example: 'https://mi-cdn.com/categorias/bebidas.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  photoUrl?: string;
}
