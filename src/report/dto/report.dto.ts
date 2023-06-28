import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class ReportDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userId: number;
}
