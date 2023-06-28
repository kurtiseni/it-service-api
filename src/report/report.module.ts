import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  imports: [ProductsModule],
  providers: [ReportService],
})
export class ReportModule {}
