import { Controller, Get, Post, Body, HttpCode, Req } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { CreateMonobankDto } from './dto/create-monobank.dto';
import { UserTokenData } from '../shared/interfaces/user';

@Controller('monobank')
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createMonobankDto: CreateMonobankDto) {
    return this.monobankService.create(createMonobankDto);
  }

  @Get()
  get() {
    return;
  }

  @Get('/transactions')
  getTransactions(@Req() req: { user: UserTokenData }) {
    return this.monobankService.getTransactions(req.user.userId);
  }
}
