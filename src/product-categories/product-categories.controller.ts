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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
import { FilterProductCategoriesDto } from './dto/filter-product-categories.dt';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermission } from '../auth/decorators/require-permission.decorator';
import { Resource } from '../shared/enums/resource.enum';
import { Action } from '../shared/enums/action.enum';

@ApiTags('Product Categories')
@Controller('product-categories')
@UseGuards(AuthGuard('jwt'), PermissionsGuard) // ✅ protegemos todo con JWT + permisos
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  @RequirePermission(`${Resource.PRODUCTCATEGORIES}.${Action.CREATE}`)
  @ApiOperation({ summary: 'Crear una nueva categoría de productos' })
  @ApiResponse({
    status: 201,
    description: 'La categoría fue creada exitosamente',
    type: ProductCategory,
  })
  create(@Body() createDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createDto);
  }

  @Get()
  @RequirePermission(`${Resource.PRODUCTCATEGORIES}.${Action.READ}`)
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
  @RequirePermission(`${Resource.PRODUCTCATEGORIES}.${Action.READ}`)
  @ApiOperation({ summary: 'Obtener una categoría por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    type: ProductCategory,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermission(`${Resource.PRODUCTCATEGORIES}.${Action.UPDATE}`)
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
  @RequirePermission(`${Resource.PRODUCTCATEGORIES}.${Action.DELETE}`)
  @ApiOperation({ summary: 'Eliminar una categoría por su ID' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.remove(id);
  }
}
