import { Database } from './database.types';

export type StreetIntersection =
  Database['public']['Tables']['street_intersection']['Row'];
export type StreetIntersectionByPoint =
  Database['public']['Functions']['get_intersections_with_streets']['Returns'][0];
export interface StreetIntersectionByPointParams {
  latitude: number;
  longitude: number;
  radius: number;
  limit: number;
}
