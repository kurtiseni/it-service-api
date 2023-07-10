import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  serialDevice: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  template: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  purchaseDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  warrantyExpiryDate: Date;

  @ApiProperty()
  additionalNotes: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerSurname: string;

  @ApiProperty()
  fullAddress: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fiscalCode: string;

  @ApiProperty()
  vatNumber: string;

  @ApiProperty()
  pec: string;

  @ApiProperty()
  sdiCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
