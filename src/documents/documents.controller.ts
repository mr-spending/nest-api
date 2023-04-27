import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { ApiResponse } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';
import { sendGridParams } from '../../settings/main.settings';

@Controller('documents')
export class DocumentsController {
  constructor(private mailService: MailerService) {}

  @Get('/privacy-policy')
  getPrivacyPolicy(@Res() res: Response): void {
    res.sendFile(path.join(process.cwd(), 'files/privacy-policy/index.html'));
  }

  @Get('/support')
  support(@Res() res: Response): void {
    res.sendFile(path.join(process.cwd(), 'files/support/index.html'));
  }

  @Post('/massage-to-support')
  @ApiResponse({ status: HttpStatus.OK })
  async massageToSupport(
    @Body() body: any,
  ): Promise<string> {
    await this.mailService.sendMail({
      to: sendGridParams.getterMail,
      from: sendGridParams.senderMail,
      subject: body.title + ' from ' + body.email,
      text: body.message,
    });
    return `
      <h3>Message successfully sent, thank you!</h3>
      <p>The support team will review your request and respond to the specified email: ${body.email}</p>
    `;
  }
}
