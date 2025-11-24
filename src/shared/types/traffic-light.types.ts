import { Database } from './database.types';

export type TrafficLight =
  Database['public']['Tables']['traffic_light']['Row'];

export type TrafficLightInsert =
  Database['public']['Tables']['traffic_light']['Insert'];

export type TrafficLightUpdate =
  Database['public']['Tables']['traffic_light']['Update'];

export interface TrafficLightSearchParams {
  name?: string;
  intersectionId?: number;
  latitude?: number;
  longitude?: number;
  active?: boolean;
}
