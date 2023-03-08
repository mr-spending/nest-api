import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  emailVerified: boolean;

  @IsString()
  @IsOptional()
  photoURL: string;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  currencyId: string;

  @IsString()
  @IsOptional()
  monoBankClientToken: string;

  @IsArray()
  @Type(() => MonoBankAccountDTO)
  @IsOptional()
  monoBankAccounts: MonoBankAccountDTO[];

  @IsString()
  @IsOptional()
  displayLanguage: string;
}

export class MonoBankAccountDTO {
  @IsNumber()
  @IsNotEmpty()
  currencyCode: number;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  maskedPan: string[];

  @IsString()
  @IsNotEmpty()
  type: string;
}
