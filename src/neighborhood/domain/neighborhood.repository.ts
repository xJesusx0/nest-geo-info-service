import { NeighborhoodByPoint } from '@/shared/types/neighborhood.types';

export interface NeighborhoodRepository {
  findByCoordinates(
    longitude: number,
    latitude: number,
  ): Promise<NeighborhoodByPoint | null>;
}

export const NEIGHBORHOOD_REPOSITORY = 'NeighborhoodRepository';
