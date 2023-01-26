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
  create(
    @Req() req: { user: User },
    @Body() createSpendingDto: SpendingDto,
  ): Promise<SpendingDto> {
    return this.spendingService.create(createSpendingDto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: { user: User }): Promise<SpendingDto[]> {
    return this.spendingService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(
    @Req() req: { user: User },
    @Param('id') id: string,
  ): Promise<SpendingDto> {
    return this.spendingService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Req() req: { user: User },
    @Param('id') id: string,
    @Body() updateSpendingDto: UpdateSpendingDto,
  ): Promise<SpendingDto> {
    return this.spendingService.update(id, updateSpendingDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Req() req: { user: User }, @Param('id') id: string): Promise<void> {
    return this.spendingService.remove(id, req.user.userId);
  }
}
