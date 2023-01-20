import { PartialType } from '@nestjs/mapped-types';
import { SpendingDto } from './spending.dto';

export class UpdateSpendingDto extends PartialType(SpendingDto) {}
