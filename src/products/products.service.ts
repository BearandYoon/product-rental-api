import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(filterDto: FilterProductsDto): Promise<Product[]> {
    const { search, minPrice, maxPrice, location, category } = filterDto;
    const query = this.productRepository.createQueryBuilder('product');

    if (search) {
      query.andWhere(
        '(product.name LIKE :search OR product.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (minPrice) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (location) {
      query.andWhere('product.location LIKE :location', { location });
    }
    if (category) {
      query.andWhere('product.category = :category', { category });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Product> {
    if (!id) {
      throw new NotFoundException(`ID is invalid`);
    }

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getCategories(): Promise<CategoryDto[]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .select('product.category', 'category')
      .addSelect('COUNT(product.id)', 'count')
      .groupBy('product.category');
    const categories = await query.getRawMany();
    return categories.map((cat) => ({
      category: cat.category,
      count: parseInt(cat.count, 10),
    }));
  }
}
