import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { SpendingService } from './spending.service';
import { SpendingDto } from './dto/spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { User } from '../shared/interfaces/user';

@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Post()
  create(@Body() createSpendingDto: SpendingDto) {
    return this.spendingService.create(createSpendingDto);
  }

  @Get()
  findAll(@Req() req: { user: User }) {
    return this.spendingService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Req() req: { user: User }, @Param('id') id: string) {
    return this.spendingService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Req() req: { user: User },
    @Param('id') id: string,
    @Body() updateSpendingDto: UpdateSpendingDto,
  ) {
    return this.spendingService.update(id, updateSpendingDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Req() req: { user: User }, @Param('id') id: string) {
    return this.spendingService.remove(id, req.user.userId);
  }
}
