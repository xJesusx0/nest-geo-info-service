import { Inject, Injectable } from '@nestjs/common';
import { toDto } from '@/shared/utils/dto-transformer';
import { CITY_REPOSITORY } from '../domain/city.repository';
import type { CityRepository } from '../domain/city.repository';
import { CitySearchQueryParams } from '@/shared/types/city.types';
import { CityDto } from '../presentation/dto/city.dto';

@Injectable()
export class CityService {
  constructor(
    @Inject(CITY_REPOSITORY)
    private readonly cityRepository: CityRepository,
  ) {}

  async getAllCities(query: CitySearchQueryParams): Promise<CityDto[]> {
    const cities = await this.cityRepository.findAll(query);
    return toDto(CityDto, cities);
  }

  async getCityById(id: number): Promise<CityDto | null> {
    const city = await this.cityRepository.findById(id);
    if (!city) {
      return null;
    }
    return toDto(CityDto, city);
  }
}
