import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class StatementItemDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  time: number;

  @Expose()
  @IsString()
  @IsOptional()
  description: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  currencyCode: number;
}

export class MonoBankDataDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  account: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => StatementItemDto)
  statementItem: StatementItemDto;
}

export class CreateMonobankDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => MonoBankDataDto)
  data: MonoBankDataDto;

  @Expose()
  @IsString()
  @IsNotEmpty()
  type: string;
}

