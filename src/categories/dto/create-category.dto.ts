import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  amount: number;
}
