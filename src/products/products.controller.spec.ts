import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

const mockProductsService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [
        {
          id: 1,
          name: 'Камера Canon EOS 80D',
          price: 50,
          category: 'Електроніка',
          location: 'Київ',
          description: 'Професійна камера для фото- та відеозйомки.',
          image: 'camera.jpg',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockProducts);

      const result = await controller.getAllProducts({});
      expect(result).toEqual(mockProducts);
      expect(service.findAll).toHaveBeenCalledWith({});
    });
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      const mockProduct = {
        id: 1,
        name: 'Камера Canon EOS 80D',
        price: 50,
        category: 'Електроніка',
        location: 'Київ',
        description: 'Професійна камера для фото- та відеозйомки.',
        image: 'camera.jpg',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);

      const result = await controller.getProductById(1);
      expect(result).toEqual(mockProduct);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if product does not exist', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new Error('Product not found'));

      await expect(controller.getProductById(1)).rejects.toThrow(
        'Product not found',
      );
    });
  });
});
