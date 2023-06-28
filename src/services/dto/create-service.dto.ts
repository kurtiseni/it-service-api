import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty()
  productKey: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  expirayDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { message: 'serviceCost must be a number' })
  serviceCost: number;

  @ApiProperty()
  @IsBoolean()
  repairStatus: boolean;

  @ApiProperty()
  description: string;
}
