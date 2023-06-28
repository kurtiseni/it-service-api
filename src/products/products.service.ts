import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly userService: UsersService,
  ) {}

  async findOne(id: number): Promise<Product> {
    return await this.findProduct(id);
  }

  async findProductByKey(id: number): Promise<Product> {
    return await this.productsRepository.findOneBy({ id });
  }

  async findAll(user, limit = 20, page = 0): Promise<any> {
    // console.log(user);
    if (user.group === 1) {
      const data = await this.productsRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.services', 'services')
        .where('product.userId = :userId', { userId: user.id })
        // .andWhere('services.repairStatus = false')
        .select([
          'services.id',
          'services.expirayDate',
          'services.serviceCost',
          'services.repairStatus',
          'services.description',
          'product.key',
          'product.brand',
          'product.purchaseDate',
          'product.description',
          'product.serialDevice',
          'product.warrantyExpiryDate',
        ])
        .offset(page)
        .limit(limit)
        .getMany();

      return {
        data,
        total: data.length,
      };
    } else {
      const [products, total] = await this.productsRepository.findAndCount({
        select: [
          'id',
          'key',
          'brand',
          'serialDevice',
          'purchaseDate',
          'description',
        ],
        take: +limit,
        skip: +page,
      });

      return {
        data: products,
        total,
      };
    }
  }

  async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    if (user.group !== 2) throw new ForbiddenException();

    const technician = await this.userService.existUser(
      createProductDto.userId,
    );
    if (!technician) throw new NotFoundException('Technician not found!');

    // test this new Product(createProductDto)
    const product = new Product();

    product.serialDevice = createProductDto.serialDevice;
    product.brand = createProductDto.brand;
    product.template = createProductDto.template;
    product.description = createProductDto.description;
    product.purchaseDate = createProductDto.purchaseDate;
    product.warrantyExpiryDate = createProductDto.warrantyExpiryDate;
    product.additionalNotes = createProductDto.additionalNotes;
    product.password = createProductDto.password;
    product.customerName = createProductDto.customerName;
    product.customerSurname = createProductDto.customerSurname;
    product.fullAddress = createProductDto.fullAddress;
    product.phoneNumber = createProductDto.phoneNumber;
    product.email = createProductDto.email;
    product.fiscalCode = createProductDto.fiscalCode;
    product.vatNumber = createProductDto.vatNumber;
    product.pec = createProductDto.pec;
    product.sdiCode = createProductDto.sdiCode;
    product.userId = createProductDto.userId;

    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

  private async findProduct(id: number): Promise<Product> {
    let product;

    try {
      product = await this.productsRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException('Product not found!');
    }

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    return product;
  }
}
