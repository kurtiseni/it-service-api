import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly productService: ProductsService,
  ) {}

  async findOne(id: number): Promise<Service> {
    return await this.findService(id);
  }

  async findAll(user, limit = 20, page = 0): Promise<any> {
    // console.log(user);

    let data = [];
    const selectColumns = [
      'service.id',
      'service.expirayDate',
      'service.serviceCost',
      'service.repairStatus',
      'service.description',
      'product.key',
      'product.brand',
      'product.purchaseDate',
      'product.warrantyExpiryDate',
    ];

    if (user.group === 1) {
      data = await this.servicesRepository
        .createQueryBuilder('service')
        .leftJoinAndSelect('service.product', 'product')
        .where('product.userId = :userId', { userId: user.id })
        .select(selectColumns)
        .offset(page)
        .limit(limit)
        .getMany();
    } else {
      data = await this.servicesRepository
        .createQueryBuilder('service')
        .leftJoinAndSelect('service.product', 'product')
        .select(selectColumns)
        .offset(page)
        .limit(limit)
        .getMany();
    }

    // console.log(data);
    return { data, total: data.length };

    // const [services, total] = await this.servicesRepository.findAndCount({
    //   relations: ['product'],
    //   loadRelationIds: true,
    //   where: whereCondition,
    //   take: +limit,
    //   skip: +page,
    // });

    // return {
    //   data: services.map((service) => ({
    //     id: service.id,
    //     expirayDate: service.expirayDate,
    //     serviceCost: service.serviceCost,
    //     repairStatus: service.repairStatus,
    //     description: service.description,
    //   })),
    //   total,
    // };
  }

  async create(
    user: User,
    createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    const product = await this.productService.findProductByKey(
      createServiceDto.productKey,
    );

    if (!product) throw new NotFoundException('Product not found!');

    // check submited request from the technic
    if (user.group === 1 && user.id !== product.userId)
      throw new BadRequestException(
        'You are not the selected technic for this product!',
      );

    const service = new Service();

    service.expirayDate = createServiceDto.expirayDate;
    service.serviceCost = createServiceDto.serviceCost;
    service.repairStatus = createServiceDto.repairStatus;
    service.description = createServiceDto.description;
    service.productId = product.id;

    return this.servicesRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    await this.servicesRepository.delete(id);
  }

  private async findService(id: number): Promise<Service> {
    let service;

    try {
      service = await this.servicesRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException('Service not found!');
    }

    if (!service) {
      throw new NotFoundException('Service not found!');
    }

    return service;
  }
}
