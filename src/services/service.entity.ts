import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/product.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  expirayDate: Date;

  @Column()
  serviceCost: number;

  @Column({ default: 0, comment: '0 = refused, 1 = completed' })
  repairStatus: boolean;

  @Column()
  description: string;

  @Column()
  productId: number;

  @CreateDateColumn({
    // type: 'timestamp',
    type: 'time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    // type: 'timestamp',
    type: 'time',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => Product, (product) => product.services)
  product: Product[];
}
