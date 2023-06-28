import { Service } from 'src/services/service.entity';
import { User } from 'src/users/user.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column()
  serialDevice: string;

  @Column()
  brand: string;

  @Column()
  template: string;

  @Column()
  description: string;

  @Column()
  purchaseDate: Date;

  @Column()
  warrantyExpiryDate: Date;

  @Column()
  additionalNotes: string;

  @Column()
  password: string;

  @Column()
  customerName: string;

  @Column()
  customerSurname: string;

  @Column()
  fullAddress: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  fiscalCode: string;

  @Column()
  vatNumber: string;

  @Column()
  pec: string;

  @Column()
  sdiCode: string;

  @Column()
  userId: number;

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

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => Service, (service) => service.product)
  services: Service[];

  @BeforeInsert()
  generateKey() {
    this.key = this.serialDevice + Date.now().toString(36);
  }
}
