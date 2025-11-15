import { Inject, Injectable } from '@nestjs/common';
import { CITY_REPOSITORY } from '../domain/city.repository';
import type { CityRepository } from '../domain/city.repository';
import {
  City,
  CitySearchQueryParams,
  CityWithRelations,
} from '@/shared/types/city.types';

@Injectable()
export class CityService {
  constructor(
    @Inject(CITY_REPOSITORY) private cityRepository: CityRepository,
  ) {}

  async findAll(
    queryParams: CitySearchQueryParams,
  ): Promise<CityWithRelations[]> {
    return this.cityRepository.findAll(queryParams);
  }

  async findOne(id: number): Promise<City | null> {
    return this.cityRepository.findById(id);
  }
}
