import { SupabaseClient } from '@supabase/supabase-js';
import { Inject, Injectable } from '@nestjs/common';
import { TrafficLightRepository } from '../domain/traffic-light.repository';
import { Database } from '@/shared/types/database.types';
import {
  TrafficLight,
  TrafficLightSearchParams,
} from '@/shared/types/traffic-light.types';
import { SUPABASE_CLIENT } from '@/supabase/supabase.module';

@Injectable()
export class TrafficLightRepositoryImpl implements TrafficLightRepository {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private supabaseClient: SupabaseClient<Database>,
  ) {}

  async search(params: TrafficLightSearchParams): Promise<TrafficLight[]> {
    let query = this.supabaseClient.from('traffic_light').select('*');

    // Filtrar por nombre (búsqueda parcial, case-insensitive)
    if (params.name) {
      query = query.ilike('name', `%${params.name}%`);
    }

    // Filtrar por ID de intersección
    if (params.intersectionId !== undefined) {
      query = query.eq('intersection_id', params.intersectionId);
    }

    // Filtrar por coordenadas exactas
    if (params.latitude !== undefined && params.longitude !== undefined) {
      query = query
        .eq('latitude', params.latitude)
        .eq('longitude', params.longitude);
    } else if (params.latitude !== undefined) {
      query = query.eq('latitude', params.latitude);
    } else if (params.longitude !== undefined) {
      query = query.eq('longitude', params.longitude);
    }

    // Filtrar por estado activo
    if (params.active !== undefined) {
      query = query.eq('active', params.active);
    }

    // Ordenar por fecha de creación (más recientes primero)
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error searching traffic lights:', error);
      throw new Error(`Failed to search traffic lights: ${error.message}`);
    }

    return data || [];
  }

  async findById(id: number): Promise<TrafficLight | null> {
    const { data, error } = await this.supabaseClient
      .from('traffic_light')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // Si el error es que no se encontró, retornamos null
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error finding traffic light by id:', error);
      throw new Error(`Failed to find traffic light: ${error.message}`);
    }

    return data;
  }
}
