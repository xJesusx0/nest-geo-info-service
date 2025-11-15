import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryCityDto {
  @IsOptional()
  @Type(() => Number)
  countryId?: number;

  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  daneCode?: string;

  @IsOptional()
  @IsString()
  countryName?: string;

  @IsOptional()
  @IsString()
  departmentName?: string;
}
