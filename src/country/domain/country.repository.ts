import {
  Country,
  CountrySearchQueryParams,
} from 'src/shared/types/country.types';

export interface CountryRepository {
  findAll(queryParams: CountrySearchQueryParams): Promise<Country[]>;
  findById(id: number): Promise<Country | null>;
}
