import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StatementItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  time: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  currencyCode: number;
}

export class MonoBankDataDto {
  @IsString()
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  @Type(() => StatementItemDto)
  statementItem: StatementItemDto;
}

export class CreateMonobankDto {
  @IsNotEmpty()
  @Type(() => MonoBankDataDto)
  data: MonoBankDataDto;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class MonobankTransactionDto {
  @IsNotEmpty()
  @Type(() => MonoBankDataDto)
  data: MonoBankDataDto;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
