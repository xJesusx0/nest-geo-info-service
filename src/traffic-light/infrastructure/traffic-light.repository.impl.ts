import { SupabaseClient } from '@supabase/supabase-js';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TrafficLightRepository } from '../domain/traffic-light.repository';
import { Database } from '@/shared/types/database.types';
import {
  CreateTrafficLightParams,
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

  async create(params: CreateTrafficLightParams): Promise<TrafficLight> {
    const { name, intersectionId, latitude, longitude, keyHash } = params;

    // Llamar a la función de base de datos que valida y crea el semáforo
    const { data: trafficLightId, error } = await this.supabaseClient.rpc(
      'create_traffic_light',
      {
        p_name: name,
        p_intersection_id: intersectionId,
        p_latitude: latitude,
        p_longitude: longitude,
        p_key_hash: keyHash,
      },
    );

    if (error) {
      console.error('Error creating traffic light:', error);
      this.handleCreateTrafficLightError(error);
    }

    // Validar que se obtuvo un ID válido
    if (!trafficLightId) {
      throw new InternalServerErrorException(
        'No se pudo obtener el ID del semáforo creado',
      );
    }

    // Buscar el semáforo recién creado por su ID
    const trafficLight = await this.findById(trafficLightId);

    if (!trafficLight) {
      throw new Error('Traffic light was created but could not be retrieved');
    }

    return trafficLight;
  }

  /**
   * Analiza el error de PostgreSQL y lanza la excepción HTTP apropiada
   */
  private handleCreateTrafficLightError(error: unknown): never {
    // Type guard para asegurar que error tiene la propiedad message
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? String(error.message)
        : '';

    // Intersección no existe
    if (errorMessage.includes('No existe una intersección activa')) {
      throw new NotFoundException(
        'La intersección especificada no existe o no está activa',
      );
    }

    // Semáforo muy lejos de la intersección
    if (
      errorMessage.includes('está a') &&
      errorMessage.includes('metros de la intersección')
    ) {
      throw new BadRequestException(
        'El semáforo está demasiado lejos de la intersección. Debe estar a máximo 10 metros',
      );
    }

    // Duplicado en coordenadas
    if (
      errorMessage.includes('Ya existe un semáforo activo en las coordenadas')
    ) {
      throw new ConflictException(
        'Ya existe un semáforo activo en estas coordenadas exactas',
      );
    }

    // Latitud inválida
    if (errorMessage.includes('Latitud inválida')) {
      throw new BadRequestException(
        'Latitud inválida. Debe estar entre -90 y 90',
      );
    }

    // Longitud inválida
    if (errorMessage.includes('Longitud inválida')) {
      throw new BadRequestException(
        'Longitud inválida. Debe estar entre -180 y 180',
      );
    }

    // Parámetros faltantes
    if (errorMessage.includes('Todos los parámetros son requeridos')) {
      throw new BadRequestException(
        'Todos los parámetros son requeridos para crear el semáforo',
      );
    }

    // Error genérico
    throw new InternalServerErrorException(
      `Error al crear el semáforo: ${errorMessage}`,
    );
  }
}
