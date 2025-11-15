import {
  City,
  CitySearchQueryParams,
  CityWithRelations,
} from '@/shared/types/city.types';

export interface CityRepository {
  findAll(queryParams: CitySearchQueryParams): Promise<CityWithRelations[]>;
  findById(id: number): Promise<City | null>;
}

export const CITY_REPOSITORY = 'CityRepository';
