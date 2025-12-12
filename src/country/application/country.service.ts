import { Inject, Injectable } from '@nestjs/common';
import { toDto } from '@/shared/utils/dto-transformer';
import type { CountryRepository } from '../domain/country.repository';
import { COUNTRY_REPOSITORY } from '../domain/country.repository';
import { CountrySearchQueryParams } from '@/shared/types/country.types';
import { CountryDto } from '../presentation/dto/country.dto';

@Injectable()
export class CountryService {
  constructor(
    @Inject(COUNTRY_REPOSITORY)
    private readonly countryRepository: CountryRepository,
  ) {}

  async getAllCountries(
    query: CountrySearchQueryParams,
  ): Promise<CountryDto[]> {
    const countries = await this.countryRepository.findAll(query);
    return toDto(CountryDto, countries);
  }

  async getCountryById(id: number): Promise<CountryDto | null> {
    const country = await this.countryRepository.findById(id);
    if (!country) {
      return null;
    }
    return toDto(CountryDto, country);
  }
}
