import { Controller, Get, Post, Body } from '@nestjs/common';
import { MonobankService } from './monobank.service';

@Controller('monobank')
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @Post()
  create(@Body() createMonobankDto: any) {
    return this.monobankService.create(createMonobankDto);
  }

  @Get()
  get() {
    return;
  }
}
