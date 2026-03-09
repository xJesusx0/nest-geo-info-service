import {
  StreetIntersection,
  StreetIntersectionByPoint,
  StreetIntersectionByPointParams,
} from '@/shared/types/intersection.types';

export const STREET_INTERSECTION_REPOSITORY = 'StreetIntersectionRepository';

export interface StreetIntersectionRepository {
  findAll(): Promise<StreetIntersection[]>;

  getById(id: number): Promise<StreetIntersection | null>;

  getByPoint(
    params: StreetIntersectionByPointParams,
  ): Promise<StreetIntersectionByPoint[]>;

  createIntersection(
    streetAId: number,
    streetBId: number,
  ): Promise<StreetIntersection>;
}
