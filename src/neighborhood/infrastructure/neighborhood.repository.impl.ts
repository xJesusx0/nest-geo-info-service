import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { NeighborhoodRepository } from '../domain/neighborhood.repository';
import { NeighborhoodByPoint } from '@/shared/types/neighborhood.types';
import { Database } from '@/shared/types/database.types';
import { SUPABASE_CLIENT } from '@/supabase/supabase.module';

@Injectable()
export class SupabaseNeighborhoodRepository implements NeighborhoodRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient<Database>,
  ) {}

  async findByCoordinates(
    longitude: number,
    latitude: number,
  ): Promise<NeighborhoodByPoint | null> {
    const { data, error } = await this.supabaseClient
      .rpc('get_neighborhood_by_point', {
        lon: longitude,
        lat: latitude,
      })
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error(`Geo query failed: ${error.message}`);
      throw new Error(`Geo query failed: ${error.message}`);
    }

    return data;
  }
}
