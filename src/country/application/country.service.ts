import { Inject, Injectable } from '@nestjs/common';
import type { CountryRepository } from '../domain/country.repository';
import { COUNTRY_REPOSITORY } from '../domain/country.repository';
import {
  Country,
  CountrySearchQueryParams,
} from 'src/shared/types/country.types';

@Injectable()
export class CountryService {
  constructor(
    @Inject(COUNTRY_REPOSITORY)
    private readonly countryRepository: CountryRepository,
  ) {}

  async getAllCountries(query: CountrySearchQueryParams): Promise<Country[]> {
    return this.countryRepository.findAll(query);
  }

  async getCountryById(id: number): Promise<Country | null> {
    return this.countryRepository.findById(id);
  }
}
