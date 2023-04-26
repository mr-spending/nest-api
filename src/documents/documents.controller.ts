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
import { UserTokenData } from '../shared/interfaces/user';

@Controller('documents')
export class DocumentsController {
  constructor() {}

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
  massageToSupport(
    @Body() body: any,
  ): string {
    console.log(body);
    return `
      <h3>Message successfully sent, thank you!</h3>
      <p>The support team will review your request and respond to the specified email: ${body.email}</p>
    `;
  }
}
