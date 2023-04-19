import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    const reqBody = JSON.stringify(req.body);
    this.logger.log(
      '',
      '/////////////////////////////////////////////////////////////////////////////////////////////',
      `Logging HTTP request ${req.method} ${req.baseUrl + req.url} ${
        res.statusCode
      }`,
      '---------------------------------------------------------------------------------------------',
      `REQ BODY: ${reqBody}`,
      '/////////////////////////////////////////////////////////////////////////////////////////////',
      '',
    );
    next();
  }
}
