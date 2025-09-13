```ts
@ApiTags('Product Categories')
@Controller('product-categories')
@UseGuards(AuthGuard('jwt'), PermissionsGuard) // ✅ protegemos todo con JWT + permisos
@ApiBearerAuth('access-token') // ✅ le señala al Swagger que use la cabecera "Authorization" al momento de hacer la petición desde el cliente con url '/api'
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
}
```