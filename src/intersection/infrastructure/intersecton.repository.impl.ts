import { SupabaseClient } from '@supabase/supabase-js';
import { StreetIntersectionRepository } from '../domain/intersection.repository';
import { Database } from '@/shared/types/database.types';
import {
  StreetIntersectionByPointParams,
  StreetIntersectionByPoint,
} from '@/shared/types/intersection.types';
import { SUPABASE_CLIENT } from '@/supabase/supabase.module';
import { BadRequestException, Inject } from '@nestjs/common';

export class StreetIntersectionRepositoryImpl
  implements StreetIntersectionRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private supabaseClient: SupabaseClient<Database>,
  ) { }
  async getByPoint(
    params: StreetIntersectionByPointParams,
  ): Promise<StreetIntersectionByPoint[]> {


    if (!params || !params.latitude || !params.longitude) {
      throw new BadRequestException('Invalid parameters');
    }

    if (!params.limit) {
      params.limit = 10;
    }

    if (!params.radius) {
      params.radius = 10;
    }

    const { data, error } = await this.supabaseClient
      .rpc('get_intersections_with_streets', {
        p_latitude: params.latitude,
        p_longitude: params.longitude,
        p_radius_meters: params.radius,
        p_limit: params.limit,
      })
      .select('*');

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    return data || [];
  }
}
