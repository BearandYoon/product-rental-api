import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductsDto } from './dto/filter-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query() filterDto: FilterProductsDto) {
    return this.productsService.findAll(filterDto);
  }

  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }
}
