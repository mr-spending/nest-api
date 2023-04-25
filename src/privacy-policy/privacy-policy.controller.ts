import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';


@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor() {}

  @Get()
  getPrivacyPolicy(@Res() res: Response): void {
    res.sendFile(
      path.join(__dirname, '../../../', 'files/privacy-policy/index.html')
    );
  }
}
