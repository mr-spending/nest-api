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

  @Get('/deleted')
  @ApiResponse({ status: 200, type: [SpendingDto] })
  async findAllDeleted(@Req() req: { user: UserTokenData }): Promise<Spending[]> {
    return await this.spendingService.findAllDeleted(req.user.userId);
  }

  @Get('/pending')
  @ApiResponse({ status: 200, type: [SpendingDto] })
  async findAllPending(@Req() req: { user: UserTokenData }): Promise<Spending[]> {
    return await this.spendingService.findAllPending(req.user.userId);
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
  async delete(@Req() req: { user: UserTokenData }, @Param('id') id: string): Promise<void> {
    await this.spendingService.delete(id, req.user.userId);
  }

  @Delete('/hard-delete/all-rejected')
  @ApiResponse({ status: 200 })
  async hardDeleteAllRejected(@Req() req: { user: UserTokenData }): Promise<void> {
    await this.spendingService.hardDeleteAllRejected(req.user.userId);
  }

  @Delete('/hard-delete/:id')
  @ApiResponse({ status: 200 })
  async hardDelete(@Req() req: { user: UserTokenData }, @Param('id') id: string): Promise<void> {
    await this.spendingService.hardDelete(id, req.user.userId);
  }
}
