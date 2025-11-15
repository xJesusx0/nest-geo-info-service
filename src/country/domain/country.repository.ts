import {
  Country,
  CountrySearchQueryParams,
} from '@/shared/types/country.types';

export interface CountryRepository {
  findAll(queryParams: CountrySearchQueryParams): Promise<Country[]>;
  findById(id: number): Promise<Country | null>;
}

export const COUNTRY_REPOSITORY = 'CountryRepository';
