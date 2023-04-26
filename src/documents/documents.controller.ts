import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('documents')
export class DocumentsController {
  constructor() {}

  @Get('/privacy-policy')
  getPrivacyPolicy(@Res() res: Response): void {
    res.sendFile(path.join(process.cwd(), 'files/privacy-policy/index.html'));
  }
}
