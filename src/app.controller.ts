import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/send-email')
  async sendMailer(@Body() data: any, @Res() response: any) {
    const mail = await this.appService.sendEmail(data);
    return response.status(200).json({
      message: 'success',
      mail
    });
  }
}
