import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';

import { SpendingService } from './spending.service';
import { GetSpendingQueryDto, SpendingDto } from './dto/spending.dto';
import { UserTokenData } from '../shared/interfaces/user';

@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Post()
  create(@Req() req: { user: UserTokenData }, @Body() createSpendingDto: SpendingDto): Promise<SpendingDto>{
    return this.spendingService.create(createSpendingDto, req.user.userId) as Promise<SpendingDto>;
  }

  @Get()
  findAll(
    @Req() req: { user: UserTokenData },
    @Query() params: GetSpendingQueryDto,
  ): Promise<SpendingDto[]> {
    return this.spendingService.findAll(req.user.userId, params) as Promise<SpendingDto[]>;
  }

  @Patch(':id')
  update(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string,
    @Body() updateSpendingDto: SpendingDto,
  ): Promise<SpendingDto> {
    return this.spendingService.update(id, updateSpendingDto, req.user.userId) as Promise<SpendingDto>;
  }

  @Delete(':id')
  remove(@Req() req: { user: UserTokenData }, @Param('id') id: string): void {
    this.spendingService.remove(id, req.user.userId);
  }
}
