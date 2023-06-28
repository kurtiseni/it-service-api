import { Product } from 'src/products/product.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  password: string;

  @Column({
    default: 1,
    comment: '1 = technicians, 2 = acceptance',
    type: 'tinyint',
  })
  group: number;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  productUser: Product[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
