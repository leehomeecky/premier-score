import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getServerStatus(@Req() req: Request, @Res() resp) {
    const result = await this.appService.getServerStatus();
    resp.json({
      code: 0,
      message: result,
    });
  }
}
