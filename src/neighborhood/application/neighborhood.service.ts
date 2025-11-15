import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NEIGHBORHOOD_REPOSITORY } from '../domain/neighborhood.repository';
import type { NeighborhoodRepository } from '../domain/neighborhood.repository';
import { NeighborhoodByPoint } from '@/shared/types/neighborhood.types';
import { NeighborhoodDto } from '../presentation/dto/neighborhood.dto';

@Injectable()
export class NeighborhoodService {
  constructor(
    @Inject(NEIGHBORHOOD_REPOSITORY)
    private neighborhoodRepository: NeighborhoodRepository,
  ) {}

  async findByCoordinates(
    longitude: number,
    latitude: number,
  ): Promise<NeighborhoodDto | null> {
    const neighborhood = await this.neighborhoodRepository.findByCoordinates(
      longitude,
      latitude,
    );
    if (!neighborhood) {
      return null;
    }
    return plainToInstance(NeighborhoodDto, neighborhood, {
      excludeExtraneousValues: true,
    });
  }
}
