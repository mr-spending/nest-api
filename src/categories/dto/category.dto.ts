import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsNotEmpty()
  @Type(() => IconModel)
  icon: IconModel;
}
