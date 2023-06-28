import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <div style="height: 100%;display: flex;align-items: center;justify-content: center;">
        <div>
          <h1 style="margin:0;">It service API</h1>
          <p align="center">
            <code>Build on NestJS!</code><br><br>
            <a href="/api">Docs</a>
          </p>
        </div>
      </div>`;
  }
}
