import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class QueryNeighborhoodDto {
  @IsNotEmpty()
  @IsLongitude()
  @Type(() => Number)
  longitude: number;

  @IsNotEmpty()
  @IsLatitude()
  @Type(() => Number)
  latitude: number;
}
