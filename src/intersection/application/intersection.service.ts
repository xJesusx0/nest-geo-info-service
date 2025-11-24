import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { STREET_INTERSECTION_REPOSITORY } from '../domain/intersection.repository';
import type { StreetIntersectionRepository } from '../domain/intersection.repository';
import { StreetIntersectionByPointParams } from '@/shared/types/intersection.types';
import { StreetIntersectionByPointDto } from '../presentation/dto/intersection.dto';

@Injectable()
export class IntersectionService {
  constructor(
    @Inject(STREET_INTERSECTION_REPOSITORY)
    private readonly intersectionRepository: StreetIntersectionRepository,
  ) { }

  async getByPoint(
    params: StreetIntersectionByPointParams,
  ): Promise<StreetIntersectionByPointDto[]> {
    const intersections = await this.intersectionRepository.getByPoint(params);
    return plainToInstance(StreetIntersectionByPointDto, intersections, {
      excludeExtraneousValues: true,
    });
  }
}
