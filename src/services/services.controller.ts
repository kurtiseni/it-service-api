import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './service.entity';
import { ServicesService } from './services.service';

@ApiTags('services')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Service> {
    return this.servicesService.findOne(+id);
  }

  @Post()
  create(
    @Request() req,
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    return this.servicesService.create(req.user, createServiceDto);
  }

  @Get(':limit?/:page?')
  findAll(
    @Request() req,
    @Param('limit') limit: number,
    @Param('page') page: number,
  ): Promise<Service[]> {
    return this.servicesService.findAll(req.user, limit, page);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.servicesService.remove(id);
  // }
}
