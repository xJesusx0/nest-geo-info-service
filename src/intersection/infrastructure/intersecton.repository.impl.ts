import { SupabaseClient } from '@supabase/supabase-js';
import { StreetIntersectionRepository } from '../domain/intersection.repository';
import { Database } from '@/shared/types/database.types';
import {
  StreetIntersection,
  StreetIntersectionByPointParams,
  StreetIntersectionByPoint,
  StreetIntersectionWithStreets,
} from '@/shared/types/intersection.types';
import { SUPABASE_CLIENT } from '@/supabase/supabase.module';
import { BadRequestException, Inject } from '@nestjs/common';

export class StreetIntersectionRepositoryImpl implements StreetIntersectionRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private supabaseClient: SupabaseClient<Database>,
  ) {}

  async findAll(): Promise<StreetIntersectionWithStreets[]> {
    const { data, error } = await this.supabaseClient.rpc(
      'get_all_intersections',
    );

    if (error) {
      console.error('Error fetching all intersections:', error);
      throw new Error(`Failed to fetch intersections: ${error.message}`);
    }

    return data || [];
  }

  async getById(id: number): Promise<StreetIntersection | null> {
    const { data, error } = await this.supabaseClient
      .from('street_intersection')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error fetching intersection by ID:', error);
      throw new Error(`Failed to fetch intersection: ${error.message}`);
    }

    return data;
  }

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

  async createIntersection(
    streetAId: number,
    streetBId: number,
  ): Promise<StreetIntersection> {
    if (!streetAId || !streetBId) {
      throw new BadRequestException(
        'Both street IDs are required to create an intersection',
      );
    }

    if (streetAId === streetBId) {
      throw new BadRequestException(
        'Street IDs must be different to create an intersection',
      );
    }

    const minId = Math.min(streetAId, streetBId);
    const maxId = Math.max(streetAId, streetBId);

    // Llamar a la función de base de datos que crea la intersección si las calles se cruzan
    const { error } = await this.supabaseClient.rpc(
      'create_street_intersection',
      {
        p_street_a_id: minId,
        p_street_b_id: maxId,
      },
    );

    if (error) {
      console.error('Error creating street intersection:', error);
      throw new Error(`Failed to create intersection: ${error.message}`);
    }

    // Buscar la intersección creada
    const { data, error: queryError } = await this.supabaseClient
      .from('street_intersection')
      .select('*')
      .or(
        `and(street_a_id.eq.${streetAId},street_b_id.eq.${streetBId}),and(street_a_id.eq.${streetBId},street_b_id.eq.${streetAId})`,
      )
      .single();

    if (queryError || !data) {
      throw new BadRequestException(
        'The streets do not intersect. No intersection was created.',
      );
    }

    return data;
  }
}
