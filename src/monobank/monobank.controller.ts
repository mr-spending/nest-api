import { Controller, Get, Post, Body, HttpCode, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MonobankService } from './monobank.service';
import { CreateMonobankDto } from './dto/create-monobank.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { Spending } from '../spending/schema/spending.schema';
import { SpendingDto } from '../spending/dto/spending.dto';

@ApiTags('Monobank')
@ApiBearerAuth()
@Controller('monobank')
export class MonobankController {

  constructor(private readonly monobankService: MonobankService) { }

  @Get()
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  async monoTest() { }

  @Post()
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  async create(@Body() createMonobankDto: CreateMonobankDto): Promise<any> {
    return await this.monobankService.create(createMonobankDto);
  }

  @Get('/transactions')
  @ApiResponse({ status: 200, type: [SpendingDto] })
  async getTransactions(@Req() req: { user: UserTokenData }): Promise<Spending[]> {
    return await this.monobankService.getTransactions(req.user.userId);
  }
}
