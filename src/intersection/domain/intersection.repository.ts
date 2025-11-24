import {
  StreetIntersection,
  StreetIntersectionByPoint,
  StreetIntersectionByPointParams,
} from '@/shared/types/intersection.types';

export const STREET_INTERSECTION_REPOSITORY = 'StreetIntersectionRepository';

export interface StreetIntersectionRepository {
  getByPoint(
    params: StreetIntersectionByPointParams,
  ): Promise<StreetIntersectionByPoint[]>;

  createIntersection(
    streetAId: number,
    streetBId: number,
  ): Promise<StreetIntersection>;
}
