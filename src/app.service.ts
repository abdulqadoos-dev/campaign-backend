import { Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

@Injectable()

export class AppService {

  constructor(private readonly mailService: MailerService) { }

  getHello(): string {
    return 'Hello World!';
  }

  sendEmail(data: any) {
    return this.mailService.sendMail({
      from: process.env.EMAIL_FROM_ADDRESS,
      to: data.to,
      subject: data.subject,
      text: data.body,
    });
  }

}
