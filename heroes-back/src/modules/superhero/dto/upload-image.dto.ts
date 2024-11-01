import { IsBoolean, IsOptional } from 'class-validator';

export class UploadImageDto {
  @IsBoolean()
  @IsOptional()
  isMain?: boolean;
}
