import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';

import { sendGridParams } from '../../settings/main.settings';

@Controller('documents')
export class DocumentsController {
  constructor(private mailService: MailerService) {}

  @Post('/massage-to-support')
  @ApiResponse({ status: HttpStatus.OK })
  async massageToSupport(@Body() body: any): Promise<string[]> {
    await this.mailService.sendMail({
      to: sendGridParams.getterMail,
      from: sendGridParams.senderMail,
      subject: body.title + ' from ' + body.email,
      text: body.message,
    });
    return [
      'Message successfully sent, thank you!',
      `The support team will review your request and respond to the specified email: ${body.email}`
    ];
  }
}
