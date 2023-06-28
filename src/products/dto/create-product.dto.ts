import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateProductDto {
  key: string;
  serialDevice: string;
  brand: string;
  template: string;
  description: string;

  @IsNotEmpty()
  @IsDateString()
  purchaseDate: Date;

  @IsNotEmpty()
  @IsDateString()
  warrantyExpiryDate: Date;
  additionalNotes: string;
  password: string;
  customerName: string;
  customerSurname: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
  fiscalCode: string;
  vatNumber: string;
  pec: string;
  sdiCode: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
