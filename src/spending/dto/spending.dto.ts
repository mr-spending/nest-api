import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class SpendingDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => !o.bankId)
  id: string;

  @IsString()
  @IsOptional()
  bankId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  time: number;

  @IsString()
  @IsOptional()
  categoryId: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsNumber()
  @IsOptional()
  currencyCode: number;

  @IsString()
  @IsOptional()
  userId: string;
}

export class GetSpendingQueryDto {
  @IsString()
  @IsOptional()
  readonly startDate: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.startDate)
  readonly endDate: string;
}
