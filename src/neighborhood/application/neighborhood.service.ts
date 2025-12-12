import { Inject, Injectable } from '@nestjs/common';
import { toDto } from '@/shared/utils/dto-transformer';
import type { NeighborhoodRepository } from '../domain/neighborhood.repository';
import { NEIGHBORHOOD_REPOSITORY } from '../domain/neighborhood.repository';
import { NeighborhoodDto } from '../presentation/dto/neighborhood.dto';

@Injectable()
export class NeighborhoodService {
  constructor(
    @Inject(NEIGHBORHOOD_REPOSITORY)
    private readonly neighborhoodRepository: NeighborhoodRepository,
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
    return toDto(NeighborhoodDto, neighborhood);
  }
}
