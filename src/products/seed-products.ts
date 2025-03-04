import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

const seedData = [
  {
    id: 1,
    name: 'Камера Canon EOS 80D',
    price: 50,
    category: 'Електроніка',
    location: 'Київ',
    description: 'Професійна камера для фото- та відеозйомки.',
    image: 'camera.jpg',
  },
  {
    id: 2,
    name: 'Електросамокат Xiaomi Mi Pro 2',
    price: 30,
    category: 'Транспорт',
    location: 'Львів',
    description: 'Зручний електросамокат для міських поїздок.',
    image: 'scooter.jpg',
  },
  {
    id: 3,
    name: 'Ноутбук MacBook Pro 16',
    price: 100,
    category: 'Електроніка',
    location: 'Одеса',
    description: 'Потужний ноутбук для роботи та дизайну.',
    image: 'macbook.jpg',
  },
  {
    id: 4,
    name: 'Дрон DJI Mavic Air 2',
    price: 70,
    category: 'Електроніка',
    location: 'Харків',
    description: 'Дрон із високоякісною камерою для аерозйомки.',
    image: 'drone.jpg',
  },
  {
    id: 5,
    name: 'Меблі для кемпінгу',
    price: 20,
    category: 'Туризм',
    location: 'Дніпро',
    description: 'Набір складних меблів для кемпінгу.',
    image: 'camping_furniture.jpg',
  },
  {
    id: 6,
    name: 'PlayStation 5',
    price: 40,
    category: 'Електроніка',
    location: 'Запоріжжя',
    description: 'Ігрова консоль нового покоління.',
    image: 'ps5.jpg',
  },
  {
    id: 7,
    name: 'Велосипед Trek X-Caliber 9',
    price: 35,
    category: 'Транспорт',
    location: 'Київ',
    description: 'Гірський велосипед для активного відпочинку.',
    image: 'bicycle.jpg',
  },
  {
    id: 8,
    name: 'Проєктор Epson EH-TW7100',
    price: 60,
    category: 'Електроніка',
    location: 'Львів',
    description: 'Домашній проєктор із високою роздільною здатністю.',
    image: 'projector.jpg',
  },
  {
    id: 9,
    name: 'Шатер для пікніка',
    price: 15,
    category: 'Туризм',
    location: 'Одеса',
    description: 'Шатер для захисту від сонця та дощу.',
    image: 'tent.jpg',
  },
  {
    id: 10,
    name: 'Електрогриль Tefal',
    price: 25,
    category: 'Побутова техніка',
    location: 'Харків',
    description: 'Зручний електрогриль для приготування страв.',
    image: 'grill.jpg',
  },
];

async function seedProducts() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Product],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('Connected to the database.');

  const productRepository = dataSource.getRepository(Product);

  console.log('Seeding products...');
  for (const product of seedData) {
    const existingProduct = await productRepository.findOne({
      where: { id: product.id },
    });
    if (!existingProduct) {
      await productRepository.save(product);
    }
  }

  console.log('Seeding completed.');
  await dataSource.destroy();
}

seedProducts().catch((error) => {
  console.error('Error seeding data:', error);
});
