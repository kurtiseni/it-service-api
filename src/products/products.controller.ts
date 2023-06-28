import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Request() req,
    @Body() createProduct: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProduct, req.user);
  }

  @Get(':limit?/:page?')
  findAll(
    @Request() req,
    @Param('limit') limit: number,
    @Param('page') page: number,
  ): Promise<Product[]> {
    return this.productsService.findAll(req.user, limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.productsService.remove(id);
  // }
}
