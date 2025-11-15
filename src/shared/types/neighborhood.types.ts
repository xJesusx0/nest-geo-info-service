import { Database } from './database.types';

export type Neighborhood = Database['public']['Tables']['neighborhood']['Row'];
export type NeighborhoodByPoint =
  Database['public']['Functions']['get_neighborhood_by_point']['Returns'][0];
