import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterProductCategoriesDto {
  @ApiPropertyOptional({
    description: 'Filtrar categorias por nombre',
    example: 'Lacteos',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
