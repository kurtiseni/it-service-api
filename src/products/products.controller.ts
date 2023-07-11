import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(
    @Request() req,
    @Body() createProduct: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProduct, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduct: UpdateProductDto) {
    return this.productsService.update(+id, updateProduct);
  }

  @Get(':limit?/:page?')
  findAll(
    @Request() req,
    @Param('limit') limit: number,
    @Param('page') page: number,
  ): Promise<Product[]> {
    return this.productsService.findAll(req.user, limit, page);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
