import { IsString } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  nickname: string;

  @IsString()
  real_name: string;

  @IsString()
  origin_desciption: string;

  @IsString()
  superpowers: string;
}
