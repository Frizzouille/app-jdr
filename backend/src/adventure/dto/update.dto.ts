import { PartialType } from '@nestjs/mapped-types';
import { CreateAdventureDto } from './create.dto';

export class UpdateAdventureDto extends PartialType(CreateAdventureDto) {}
