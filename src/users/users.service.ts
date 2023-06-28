import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findAll(limit = 20, page = 0): Promise<any> {
    const [users, total] = await this.usersRepository.findAndCount({
      select: ['id', 'username', 'firstName', 'lastName'],
      take: limit,
      skip: page,
    });

    return { data: users, total };
  }

  async findByGroup(group = 2, limit = 20, page = 0): Promise<any> {
    const [users, total] = await this.usersRepository.findAndCount({
      where: { group },
      // take: +limit,
      // skip: +page,
    });

    return {
      data: users.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
      total,
    };
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findUser(id: number): Promise<User> {
    let user;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException('User not found!');
    }

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async existUser(id: number): Promise<boolean> {
    return (await this.usersRepository.findOneBy({ id })) ? true : false;
  }
}
