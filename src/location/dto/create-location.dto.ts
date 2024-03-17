import { IsNotEmpty, IsString, IsDecimal } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  location_name: string;

  @IsNotEmpty()
  @IsString()
  location_number: string;

  @IsNotEmpty()
  @IsDecimal()
  area: number;

  @IsString()
  parent_location: string;
}
