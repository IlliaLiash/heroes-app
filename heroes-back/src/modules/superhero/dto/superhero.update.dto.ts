import { CreateSuperheroDto } from '@/modules/superhero/dto/superhero.create.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSuperheroDto extends PartialType(CreateSuperheroDto) {}
