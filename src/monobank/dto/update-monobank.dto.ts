import { PartialType } from '@nestjs/mapped-types';
import { CreateMonobankDto } from './create-monobank.dto';

export class UpdateMonobankDto extends PartialType(CreateMonobankDto) {}
