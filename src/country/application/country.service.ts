import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
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
    return plainToInstance(CountryDto, countries, {
      excludeExtraneousValues: true,
    });
  }

  async getCountryById(id: number): Promise<CountryDto | null> {
    const country = await this.countryRepository.findById(id);
    if (!country) {
      return null;
    }
    return plainToInstance(CountryDto, country, {
      excludeExtraneousValues: true,
    });
  }
}
