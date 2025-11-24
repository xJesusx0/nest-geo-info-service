import {
  StreetIntersectionByPoint,
  StreetIntersectionByPointParams,
} from '@/shared/types/intersection.types';

export const STREET_INTERSECTION_REPOSITORY = 'StreetIntersectionRepository';

export interface StreetIntersectionRepository {
  getByPoint(
    params: StreetIntersectionByPointParams,
  ): Promise<StreetIntersectionByPoint[]>;
}
