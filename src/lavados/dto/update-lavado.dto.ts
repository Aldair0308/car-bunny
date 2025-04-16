import { PartialType } from '@nestjs/mapped-types';
import { CreateLavadoDto } from './create-lavado.dto';

export class UpdateLavadoDto extends PartialType(CreateLavadoDto) {}
