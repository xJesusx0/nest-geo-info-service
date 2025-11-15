import { IsOptional, IsString } from 'class-validator';

export class CountryQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  isoAlpha2Code?: string;

  @IsOptional()
  @IsString()
  isoAlpha3Code?: string;

  @IsOptional()
  @IsString()
  isoNumericCode?: string;
}
