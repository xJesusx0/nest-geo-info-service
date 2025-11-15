import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryDepartmentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  daneCode?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  countryId?: number;
}
