import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { FixtureFilterDto } from './modules/fixture/fixture.dto';

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

  @Get('/filter')
  async getFilter(
    @Req() req: Request<null, null, null, FixtureFilterDto>,
    @Res() resp,
  ) {
    const filter = req.query;
    const fixtures = await this.appService.getFilter(filter);

    return resp.json({
      ...fixtures,
      code: 0,
      message: 'Operation successful',
    });
  }
}
