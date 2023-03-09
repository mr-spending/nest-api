import { IsNotEmpty, IsString } from 'class-validator';
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
  @IsNotEmpty()
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
