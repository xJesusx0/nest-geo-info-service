import { Inject, Injectable } from '@nestjs/common';
import { NEIGHBORHOOD_REPOSITORY } from '../domain/neighborhood.repository';
import type { NeighborhoodRepository } from '../domain/neighborhood.repository';
import { NeighborhoodByPoint } from '@/shared/types/neighborhood.types';

@Injectable()
export class NeighborhoodService {
  constructor(
    @Inject(NEIGHBORHOOD_REPOSITORY)
    private neighborhoodRepository: NeighborhoodRepository,
  ) {}

  async findByCoordinates(
    longitude: number,
    latitude: number,
  ): Promise<NeighborhoodByPoint | null> {
    return this.neighborhoodRepository.findByCoordinates(longitude, latitude);
  }
}
