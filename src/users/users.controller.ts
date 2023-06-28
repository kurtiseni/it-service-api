import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @ValidateNested()
  // @Type(() => User)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('group/:groupId?/:limit?/:page?')
  findByGroup(
    @Param('groupId') groupId: number,
    @Param('limit') limit: number,
    @Param('page') page: number,
  ): Promise<User[]> {
    return this.usersService.findByGroup(groupId, limit, page);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':limit?/:page?')
  findAll(
    @Param('limit') limit: number,
    @Param('page') page: number,
  ): Promise<User[]> {
    return this.usersService.findAll(limit, page);
  }

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<User> {
  //   return this.usersService.findUser(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
