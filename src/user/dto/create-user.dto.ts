import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class UserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  emailVerified: boolean;

  @Expose()
  @IsString()
  @IsOptional()
  photoURL: string;

  @Expose()
  @IsString()
  @IsOptional()
  displayName: string;

  @Expose()
  @IsString()
  @IsOptional()
  currency: string;

  @Expose()
  @IsString()
  @IsOptional()
  currencyId: string;

  @Expose()
  @IsString()
  @IsOptional()
  monoBankClientToken: string;

  @Expose()
  @IsArray()
  @Type(() => MonoBankAccountDTO)
  @IsOptional()
  monoBankAccounts: MonoBankAccountDTO[];

  @Expose()
  @IsString()
  @IsOptional()
  displayLanguage: string;
}

export class MonoBankAccountDTO {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  currencyCode: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  maskedPan: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  type: string;
}
