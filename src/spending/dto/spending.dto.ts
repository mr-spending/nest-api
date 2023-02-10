import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';

export class SpendingDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => !o.bankId)
  id: string;

  @Expose()
  @IsString()
  @IsOptional()
  bankId: string;

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
  category: string;

  @Expose()
  @IsString()
  @IsOptional()
  categoryId: string;

  @Expose()
  @IsString()
  @IsOptional()
  description: string;

  @Expose()
  @IsString()
  @IsOptional()
  date: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  currencyCode: number;

  @Expose()
  @IsString()
  @IsOptional()
  comment: string;

  @Expose()
  @IsString()
  @IsOptional()
  accountId: string;

  @Expose()
  @IsString()
  @IsOptional()
  userId: string;

  @Expose()
  @IsString()
  @IsOptional()
  accountType: string;
}

export class GetSpendingsQueryDto {
  @IsString()
  @IsOptional()
  readonly startDate: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.startDate)
  readonly endDate: string;
}
