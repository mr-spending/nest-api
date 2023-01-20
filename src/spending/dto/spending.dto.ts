import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SpendingDto {
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
  @IsNotEmpty()
  category: string;

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
  comment: string;

  @IsString()
  @IsOptional()
  accountId: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  accountType: string;
}
