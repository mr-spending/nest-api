import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpendingDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => !o.bankId)
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  bankId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  time: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  categoryId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  date: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  currencyCode: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  userId: string;
}

export class GetSpendingQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  readonly startDate: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.startDate)
  @ApiProperty({ type: String })
  readonly endDate: string;
}
