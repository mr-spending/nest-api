import { IsNotEmpty, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class IconModel {
  @IsString()
  @IsNotEmpty()
  iconType: string;
  @IsString()
  @IsNotEmpty()
  background: string;
}
export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => IconModel)
  icon: IconModel;
}
