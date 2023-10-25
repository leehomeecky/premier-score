import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getServerStatus(): Promise<string> {
    const { port } = process.env;
    return `Servar runing on port ${port || 9800}`;
  }
}
