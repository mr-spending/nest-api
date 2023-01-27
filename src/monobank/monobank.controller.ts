import { Controller, Get, Post, Body } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { CreateMonobankDto } from './dto/create-monobank.dto';

@Controller('monobank')
export class MonobankController {
  constructor(private readonly monobankService: MonobankService) {}

  @Post()
  create(@Body() createMonobankDto: CreateMonobankDto) {
    return this.monobankService.create(createMonobankDto);
  }

  @Get()
  get() {
    return;
  }
}
