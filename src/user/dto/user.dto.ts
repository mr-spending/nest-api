import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IconModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  iconType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  background: string;
}

export class CategoryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @IsNotEmpty()
  @Type(() => IconModel)
  @ApiProperty({ type: IconModel })
  icon: IconModel;
}

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

export class AvailableMonoBankAccountsDTO {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number })
  lastUpdateTime: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [MonoBankAccountDTO] })
  availableAccounts: MonoBankAccountDTO[];
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

  @IsArray()
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

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  isPolicyAgreed: boolean;

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

  @IsObject()
  @IsOptional()
  @ApiProperty({ type: AvailableMonoBankAccountsDTO, required: false })
  availableMonoBankAccounts: AvailableMonoBankAccountsDTO;
}
