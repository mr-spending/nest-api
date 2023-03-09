import { Controller, Get, Post, Body, HttpCode, Req, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MonobankService } from './monobank.service';
import { CreateMonobankDto, MonobankTransactionDto } from './dto/create-monobank.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { GetSpendingQueryDto } from '../spending/dto/spending.dto';
import { Monobank } from './schema/monobank.schema';

@ApiTags('Monobank')
@ApiBearerAuth()
@Controller('monobank')
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  create(
    @Body() createMonobankDto: CreateMonobankDto
  ) {
    return this.monobankService.create(createMonobankDto);
  }

  @Get()
  @ApiResponse({ status: 200 })
  get() {
    return;
  }

  @Get('/transactions')
  @ApiResponse({ status: 200, type: [MonobankTransactionDto] })
  getTransactions(
    @Req() req: { user: UserTokenData },
    @Query() params: GetSpendingQueryDto,
  ): Promise<Monobank[]> {
    return this.monobankService.getTransactions(req.user.userId, params);
  }
}
