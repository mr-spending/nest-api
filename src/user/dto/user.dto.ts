import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from '../../categories/dto/category.dto';

export class MonoBankAccountDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  currencyCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty({ type: [String] })
  maskedPan: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  type: string;
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  emailVerified: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: [CategoryDto] })
  categories: CategoryDto[];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  photoURL: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  displayName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  currency: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  currencyId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  monoBankClientToken: string;

  @IsArray()
  @Type(() => MonoBankAccountDTO)
  @IsOptional()
  @ApiProperty({ type: [MonoBankAccountDTO], required: false })
  monoBankAccounts: MonoBankAccountDTO[];

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  displayLanguage: string;
}
