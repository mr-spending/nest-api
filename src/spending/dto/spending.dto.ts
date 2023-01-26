import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class SpendingDto {
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
