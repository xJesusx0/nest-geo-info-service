import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CITY_REPOSITORY } from '../domain/city.repository';
import type { CityRepository } from '../domain/city.repository';
import {
  City,
  CitySearchQueryParams,
  CityWithRelations,
} from '@/shared/types/city.types';
import { CityWithRelationsDto, CityDto } from '../presentation/dto/city.dto';

@Injectable()
export class CityService {
  constructor(
    @Inject(CITY_REPOSITORY) private cityRepository: CityRepository,
  ) {}

  async findAll(
    queryParams: CitySearchQueryParams,
  ): Promise<CityWithRelationsDto[]> {
    const cities = await this.cityRepository.findAll(queryParams);
    return plainToInstance(CityWithRelationsDto, cities, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<CityDto | null> {
    const city = await this.cityRepository.findById(id);
    if (!city) {
      return null;
    }
    return plainToInstance(CityDto, city, {
      excludeExtraneousValues: true,
    });
  }
}
