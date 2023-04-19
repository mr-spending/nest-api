import { Controller, Get, Post, Body, HttpCode, Req, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MonoBankService } from './mono-bank.service';
import { CreateMonoBankDto } from './dto/create-mono-bank.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { Spending } from '../spending/schema/spending.schema';
import { SpendingDto } from '../spending/dto/spending.dto';

@ApiTags('Monobank')
@ApiBearerAuth()
@Controller('monobank')
export class MonoBankController {
  constructor(private readonly monoBankService: MonoBankService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  async create(@Body() createMonoBankDto: CreateMonoBankDto): Promise<any> {
    return await this.monoBankService.create(createMonoBankDto);
  }

  @Get('/transactions')
  @ApiResponse({ status: HttpStatus.OK, type: [SpendingDto] })
  async getTransactions(
    @Req() req: { user: UserTokenData },
  ): Promise<Spending[]> {
    return await this.monoBankService.getTransactions(req.user.userId);
  }
}
