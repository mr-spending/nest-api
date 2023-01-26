import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

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

export class GetSpendingsQueryDto {
  @IsString()
  @ApiModelPropertyOptional()
  @IsOptional()
  readonly startDate: string;

  @IsString()
  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @ValidateIf((o) => o.startDate)
  readonly endDate: string;
}
