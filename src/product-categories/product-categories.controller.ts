import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
import { FilterProductCategoriesDto } from './dto/filter-product-categories.dt';

@ApiTags('Product Categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría de productos' })
  @ApiResponse({
    status: 201,
    description: 'La categoría fue creada exitosamente',
    type: ProductCategory,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías de productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías',
    type: [ProductCategory],
  })
  findAll(@Query() filterDto: FilterProductCategoriesDto) {
    return this.productCategoriesService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    type: ProductCategory,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada correctamente',
    type: ProductCategory,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoriesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por su ID' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.remove(id);
  }
}
