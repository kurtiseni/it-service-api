import { Controller, Request, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  reportFor(@Request() req, @Body() bodyReport: ReportDto) {
    return this.reportService.findProductsWithServices(req.user, bodyReport);
  }
}
