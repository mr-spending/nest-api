import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
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
  @ApiResponse({ status: HttpStatus.CREATED, type: SpendingDto })
  async create(
    @Req() req: { user: UserTokenData },
    @Body() createSpendingDto: SpendingDto,
  ): Promise<Spending> {
    return await this.spendingService.create(
      createSpendingDto,
      req.user.userId,
    );
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [SpendingDto] })
  async findAll(
    @Req() req: { user: UserTokenData },
    @Query() params: GetSpendingQueryDto,
  ): Promise<Spending[]> {
    return await this.spendingService.findAll(req.user.userId, params);
  }

  @Get('/deleted')
  @ApiResponse({ status: HttpStatus.OK, type: [SpendingDto] })
  async findAllDeleted(
    @Req() req: { user: UserTokenData },
  ): Promise<Spending[]> {
    return await this.spendingService.findAllDeleted(req.user.userId);
  }

  @Get('/pending')
  @ApiResponse({ status: HttpStatus.OK, type: [SpendingDto] })
  async findAllPending(
    @Req() req: { user: UserTokenData },
  ): Promise<Spending[]> {
    return await this.spendingService.findAllPending(req.user.userId);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: SpendingDto })
  async update(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string,
    @Body() updateSpendingDto: SpendingDto,
  ): Promise<Spending> {
    return await this.spendingService.update(
      id,
      updateSpendingDto,
      req.user.userId,
    );
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  async delete(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string,
  ): Promise<void> {
    await this.spendingService.delete(id, req.user.userId);
  }

  @Post('/delete-by-ids')
  @ApiResponse({ status: HttpStatus.OK })
  async deleteByIds(
    @Req() req: { user: UserTokenData },
    @Body() ids: string[],
  ): Promise<void> {
    await this.spendingService.deleteByIds(ids, req.user.userId);
  }

  @Delete('/hard-delete/all-rejected')
  @ApiResponse({ status: HttpStatus.OK })
  async hardDeleteAllRejected(
    @Req() req: { user: UserTokenData },
  ): Promise<void> {
    await this.spendingService.hardDeleteAllRejected(req.user.userId);
  }

  @Delete('/hard-delete/:id')
  @ApiResponse({ status: HttpStatus.OK })
  async hardDelete(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string,
  ): Promise<void> {
    await this.spendingService.hardDelete(id, req.user.userId);
  }
}
