import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async findProductsWithServices(user: User, body: ReportDto): Promise<any> {
    if (user.group !== 2) throw new ForbiddenException();

    const { userId, completed, startDate, endDate } = body;

    const mainQuery = `SELECT service.expirayDate AS 'date', user.username, product.brand, service.serviceCost AS 'price', service.repairStatus, service.id AS 'orderID'
      FROM user, product, service
      WHERE user.id = product.userId
      AND product.id = service.productId`;

    let conditions = '';
    let dateCondition = '';

    if (userId) conditions += ` AND product.userId = ${userId}`;

    if (completed) conditions += ` AND service.repairStatus = ${completed}`;

    if (startDate && endDate)
      dateCondition = ` AND service.updated_at BETWEEN '${startDate}' AND '${endDate}'`;
    else if (startDate)
      dateCondition = ` AND service.updated_at >= '${startDate}'`;
    else if (endDate) dateCondition = ` AND service.updated_at < '${endDate}'`;

    conditions += dateCondition + ' LIMIT 20';

    const sum = await this.dataSource.query(
      `SELECT SUM(service.serviceCost) as TOTAL_AMOUNT FROM user, product, service
      WHERE user.id = product.userId
      AND product.id = service.productId ` + conditions,
    );
    // console.log(mainQuery + conditions);

    return {
      data: await this.dataSource.query(mainQuery + conditions),
      totalAmount: +sum[0].TOTAL_AMOUNT,
    };
  }
}
