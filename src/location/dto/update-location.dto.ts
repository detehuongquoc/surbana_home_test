import { IsString, IsDecimal, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  location_name?: string;

  @IsString()
  @IsOptional()
  location_number?: string;

  @IsDecimal()
  @IsOptional()
  area?: number;

  @IsString()
  @IsOptional()
  parent_location?: string;
}
