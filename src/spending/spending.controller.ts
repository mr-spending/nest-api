import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SpendingService } from './spending.service';
import { GetSpendingQueryDto, SpendingDto } from './dto/spending.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { Spending } from './schema/spending.schema';

@ApiTags('Spending')
@ApiBearerAuth()
@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Post()
  @ApiResponse({ status: 201, type: SpendingDto })
  async create(
    @Req() req: { user: UserTokenData },
    @Body() createSpendingDto: SpendingDto
  ): Promise<Spending>{
    return await this.spendingService.create(createSpendingDto, req.user.userId);
  }

  @Get()
  @ApiResponse({ status: 200, type: [SpendingDto] })
  async findAll(
    @Req() req: { user: UserTokenData },
    @Query() params: GetSpendingQueryDto,
  ): Promise<Spending[]> {
    return await this.spendingService.findAll(req.user.userId, params);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: SpendingDto })
  async update(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string,
    @Body() updateSpendingDto: SpendingDto,
  ): Promise<Spending> {
    return await this.spendingService.update(id, updateSpendingDto, req.user.userId);
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  async remove(@Req() req: { user: UserTokenData }, @Param('id') id: string): Promise<void> {
    await this.spendingService.remove(id, req.user.userId);
  }
}
