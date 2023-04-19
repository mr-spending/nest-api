import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StatementItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;

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
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  comment?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  currencyCode: number;
}

export class MonoBankDataDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  account: string;

  @IsNotEmpty()
  @Type(() => StatementItemDto)
  @ApiProperty({ type: StatementItemDto })
  statementItem: StatementItemDto;
}

export class CreateMonoBankDto {
  @IsNotEmpty()
  @Type(() => MonoBankDataDto)
  @ApiProperty({ type: MonoBankDataDto })
  data: MonoBankDataDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  type: string;
}
