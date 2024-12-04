import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProducts = [
    {
      id: 1,
      name: 'Camera',
      category: 'Electronics',
      price: 100,
      location: 'NYC',
      description: 'A digital camera',
    },
    {
      id: 2,
      name: 'Sofa',
      category: 'Furniture',
      price: 300,
      location: 'LA',
      description: 'A comfortable sofa',
    },
  ];

  const mockRepository = {
    findOne: jest.fn(({ where: { id } }) =>
      mockProducts.find((p) => p.id === id),
    ),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(() => mockProducts),
      getRawMany: jest.fn(() => [
        { category: 'Electronics', count: '5' },
        { category: 'Furniture', count: '3' },
      ]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const filterDto = {};
      const result = await service.findAll(filterDto);
      expect(result).toEqual(mockProducts);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockProducts[0]);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a NotFoundException if the product is not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCategories', () => {
    it('should return categories with counts', async () => {
      const result = await service.getCategories();

      expect(result).toEqual([
        { category: 'Electronics', count: 5 },
        { category: 'Furniture', count: 3 },
      ]);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
