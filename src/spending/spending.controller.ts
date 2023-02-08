import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { SpendingService } from './spending.service';
import { GetSpendingsQueryDto, SpendingDto } from './dto/spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';
import { UserTokenData } from '../shared/interfaces/user';
import { Spending } from './schema/spending.schema';

@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Post()
  create(@Req() req: { user: UserTokenData }, @Body() createSpendingDto: SpendingDto): Promise<Spending> {
    return this.spendingService.create(createSpendingDto, req.user.userId);
  }

  @Get()
  findAll(
    @Req() req: { user: UserTokenData },
    @Query() params: GetSpendingsQueryDto,
  ): Promise<Spending[]> {
    return this.spendingService.findAll(req.user.userId, params);
  }

  @Patch(':id')
  update(
    @Req() req: { user: UserTokenData },
    @Param('id') id: string,
    @Body() updateSpendingDto: UpdateSpendingDto,
  ): Promise<Spending> {
    return this.spendingService.update(id, updateSpendingDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Req() req: { user: UserTokenData }, @Param('id') id: string): Promise<void> {
    return this.spendingService.remove(id, req.user.userId);
  }
}
