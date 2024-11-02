import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  nickname: string;

  @IsString()
  real_name: string;

  @IsString()
  origin_description: string;

  @IsString()
  superpowers: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
